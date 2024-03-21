import * as OBC from "openbim-components"
// 引入three
import * as THREE from "three"
import { ViewerSetup } from "vue-ifc-viewer"
import { ExampleTool } from "./index.ts"

export const viewer: ViewerSetup = async (viewer: OBC.Components, container: HTMLDivElement) => {
  // 初始化scene
  const sceneComponent = new OBC.SimpleScene(viewer)
  await sceneComponent.setup()
  sceneComponent.get().background = new THREE.Color(0xabcdef)
  viewer.scene = sceneComponent
  // 初始化渲染器
  const rendererComponent = new OBC.PostproductionRenderer(viewer, container)
  viewer.renderer = rendererComponent
  const postproduction = rendererComponent.postproduction
  // 初始化相机
  const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
  viewer.camera = cameraComponent
  // 初始化光源
  const raycasterComponent = new OBC.SimpleRaycaster(viewer)
  viewer.raycaster = raycasterComponent

  await viewer.init()
  postproduction.enabled = true


  // 添加网格
  const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666))
  postproduction.customEffects.excludedMeshes.push(grid.get())
  // 添加ifc加载器
  const ifcLoader = new OBC.FragmentIfcLoader(viewer)
  await ifcLoader.setup()

  // const file = await fetch('@/assets/model/building1.ifc');
  // const data = await file.arrayBuffer();
  // const buffer = new Uint8Array(data);
  // const model = await ifcLoader.load(buffer, true);
 // sceneComponent.get().add(model);

  /**
  const streamer = new OBC.FragmentIfcStreamConverter(viewer);
  streamer.settings.wasm = {
    path: "https://unpkg.com/web-ifc@0.0.51/",
    absolute: true
  }
  streamer.onGeometryStreamed.add((geometry) => {
    console.log(geometry);
  });
  streamer.onIfcLoaded.add(async (groupBuffer) => {
    console.log(groupBuffer);
  })
  streamer.streamFromBuffer(new Uint8Array(buffer));
*/

  // 添加高亮器
  const highlighter = new OBC.FragmentHighlighter(viewer)
  await highlighter.setup()

  //创建一个屏幕裁剪器,目的是提高渲染性能
  const culler = new OBC.ScreenCuller(viewer)
  await culler.setup()
  cameraComponent.controls.addEventListener("sleep", () => culler.elements.needsUpdate = true)

  //属性组件
  const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
  highlighter.events.select.onClear.add(() => {
    propertiesProcessor.cleanPropertiesList()
  })

  ifcLoader.onIfcLoaded.add(async model => {
    for (const fragment of model.items) {
      culler.elements.add(fragment.mesh)
    }
    await propertiesProcessor.process(model)
    highlighter.events.select.onHighlight.add((selection) => {
      const fragmentID = Object.keys(selection)[0]
      const expressID = Number([...selection[fragmentID]][0])
      propertiesProcessor.renderProperties(model, expressID)
    })
    await highlighter.updateHighlight()
    culler.elements.needsUpdate = true
  })

  const exampleTool = new ExampleTool(viewer)
  await exampleTool.setup({
    message: "Hi there from ExampleTool!",
    requiredSetting: 123
  })

  const mainToolbar = new OBC.Toolbar(viewer)
  mainToolbar.addChild(
    ifcLoader.uiElement.get("main"),
    propertiesProcessor.uiElement.get("main"),
    exampleTool.uiElement.get("activationBtn")
  )

  viewer.ui.addToolbar(mainToolbar)
}
