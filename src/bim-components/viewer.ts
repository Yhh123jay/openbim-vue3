import * as OBC from "openbim-components"
// 引入three
import * as THREE from "three"
import { ViewerSetup } from "vue-ifc-viewer"
import { ExampleTool } from '@/bim-components/ExampleTool'
import { ImportTool } from '@/bim-components/ImportTool'
import { FragmentManager } from 'openbim-components/src/fragments/FragmentManager'

export const viewer: ViewerSetup = async (viewer: OBC.Components, container: HTMLDivElement) => {
  const sceneComponent = new OBC.SimpleScene(viewer)
  await sceneComponent.setup()
  viewer.scene = sceneComponent
  
  const loader = new THREE.CubeTextureLoader();
  const textureUrls = [
    'assets/skybox/lake1_rt.jpg',   // px
    'assets/skybox/lake1_lf.jpg',    // nx
    'assets/skybox/lake1_up.jpg',     // py
    'assets/skybox/lake1_dn.jpg',  // ny
    'assets/skybox/lake1_bk.jpg',   // pz
    'assets/skybox/lake1_ft.jpg'     // nz
  ];
  loader.load(textureUrls, (texture) => {
    console.log(textureUrls)
    sceneComponent.get().background = texture; // 将加载完成的贴图设置为背景
  });

  //sceneComponent.get().background = new THREE.Color(0xFFFFFF)
  const rendererComponent = new OBC.PostproductionRenderer(viewer, container)
  viewer.renderer = rendererComponent
  const postproduction = rendererComponent.postproduction

  const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
  viewer.camera = cameraComponent

  const raycasterComponent = new OBC.SimpleRaycaster(viewer)
  viewer.raycaster = raycasterComponent

  await viewer.init()
  postproduction.enabled = true

  const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x000000))
  postproduction.customEffects.excludedMeshes.push(grid.get())


  // Load IFC
  const ifcLoader = new OBC.FragmentIfcLoader(viewer)
  await ifcLoader.setup()
  ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
  ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
  const highlighter = new OBC.FragmentHighlighter(viewer)
  await highlighter.setup()

  //使用Fragment Manager导入fragments
  const fragmentManager = viewer.tools.get(FragmentManager)
  async function loadFragments() {
    console.log(fragmentManager.components === viewer)
    console.log(fragmentManager.groups.length)
    if(fragmentManager.groups.length) return;
    const file = await fetch("/assets/models/small.frag");
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const group = await fragmentManager.load(buffer,true);
    console.log(fragmentManager.groups.length)
    console.log(group)
  }

  //ScreenCuller
  const culler = new OBC.ScreenCuller(viewer)
  await culler.setup()
  cameraComponent.controls.addEventListener("sleep", () => culler.elements.needsUpdate = true)
  //IfcPropertiesProcessor
  const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
  highlighter.events.select.onClear.add(() => {
    propertiesProcessor.cleanPropertiesList()
  })

  ifcLoader.onIfcLoaded.add(async (model) => {
    for (const fragment of model.items) { culler.elements.add(fragment.mesh) }
    await propertiesProcessor.process(model)
    highlighter.events.select.onHighlight.add((selection) => {
      const fragmentID = Object.keys(selection)[0]
      const expressID = Number([...selection[fragmentID]][0])
      console.log("Selected element: ", expressID)
      propertiesProcessor.renderProperties(model, expressID)
    })
    await highlighter.updateHighlight()
    culler.elements.needsUpdate = true
  })
  //ExampleTool
  const exampleTool = new ExampleTool(viewer)
  await exampleTool.setup({
    message: "Hi there from ExampleTool!",
    requiredSetting: 123
  })
  //ImportTool
  const importTool = new ImportTool(viewer)
  await importTool.setup({
    url: "assets/models/building1.ifc",
    requiredSetting: 123
  })

  const loadButton = new OBC.Button(viewer);
  loadButton.materialIcon = "download";
  loadButton.tooltip = "Load fragments";
  loadButton.onClick.add(() => loadFragments());

  //UI层面
  //Main Toolbar
  const mainToolbar = new OBC.Toolbar(viewer)
  mainToolbar.addChild(
    ifcLoader.uiElement.get("main"),
    propertiesProcessor.uiElement.get("main"),
    exampleTool.uiElement.get("activationBtn"),
    importTool.uiElement.get("activationBtn"),
    loadButton
  )
  viewer.ui.addToolbar(mainToolbar)
}
