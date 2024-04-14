import * as OBC from "openbim-components"
import { FragmentIfcLoader } from 'openbim-components'
export interface ImportToolConfig {
  url: string
  requiredSetting: number | null
}

export class ImportTool extends OBC.Component<null> implements OBC.UI, OBC.Disposable, OBC.Configurable<ImportToolConfig> {
  static uuid = "6503bf79-1b56-4500-91bc-366b2643ed44"
  enabled = false
  isSetup = false
  uiElement = new OBC.UIElement<{
    activationBtn: OBC.Button
  }>()

  constructor(components: OBC.Components) {
    super(components)
    components.tools.add(ImportTool.uuid, this)
    if (components.uiEnabled) {
      this.setUI()
    }
  }

  private setUI() {
    const activationBtn = new OBC.Button(this.components)
    activationBtn.materialIcon = "download"
    activationBtn.tooltip = "Load model"
    activationBtn.onClick.add(() => this.loadModel())
    this.uiElement.set({activationBtn})
  }

  readonly onSetup = new OBC.Event<ImportTool>()

  config: Required<ImportToolConfig> = {
    url: "/assets/models/small.ifc",
    requiredSetting: null
  }

  async setup(config?: Partial<ImportToolConfig>) {
    this.config = { ...this.config, ...config }
    const { requiredSetting } = this.config
    if (requiredSetting === null) {
      throw new Error("You need to set 'Required Setting' in order for ExampleTool to work!")
    }
    this.enabled = true
    this.isSetup = true
    await this.onSetup.trigger()
  }

  readonly onDisposed = new OBC.Event<string>()

  async dispose() {
    // Set here all your dispose logic, like cleaning up variables, disposing geometry, etc.
    this.onSetup.reset()
    await this.onDisposed.trigger(ImportTool.uuid)
    this.onDisposed.reset()
  }

  async loadModel() {
    const { requiredSetting } = this.config
    if (!(this.enabled && requiredSetting !== null)) { return }
    console.log(this.config.url, `Your required setting was ${this.config.requiredSetting}`)
    //载入模型
    //const ifcLoader = new OBC.FragmentIfcLoader(this.components)
    const ifcLoader = this.components.tools.get(FragmentIfcLoader)
    //必须要初始化，否则无法载入web-ifc.wasm
    await ifcLoader.setup()
    const scene = this.components.scene.get()
    const file = await fetch(this.config.url);
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    console.log(buffer)
    const model = await ifcLoader.load(buffer, true);
    scene.add(model)
  }
  get() {
    return null
  }
}