import * as OBC from "openbim-components"
// 引入three
import * as THREE from "three"
import { ViewerSetup } from "vue-ifc-viewer"
import { ExampleTool } from '@/bim-components/ExampleTool'
import { ImportTool } from '@/bim-components/ImportTool'
import { FragmentManager } from 'openbim-components/src/fragments/FragmentManager'
import makeTextSprite from '@/utils/spriteUtil'

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

  // FragmentBoundingBox
  const fragmentBoundingBox = new OBC.FragmentBoundingBox(viewer)
  const controls = cameraComponent.controls

  // Load IFC
  const ifcLoader = new OBC.FragmentIfcLoader(viewer)
  await ifcLoader.setup()
  ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
  ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

  //使用Fragment Manager导入fragments
  const fragmentManager = viewer.tools.get(FragmentManager)

  async function loadFragments() {
    if(fragmentManager.groups.length) return;
    const file = await fetch("/assets/models/bridge/small.frag");
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const group = await fragmentManager.load(buffer);
    const properties = await fetch("/assets/models/bridge/small.json")
    console.log(properties)
    const props = await properties.json()
    group.setLocalProperties(props)
  }

  //ScreenCuller
  //const culler = new OBC.ScreenCuller(viewer)
  //await culler.setup()
  //cameraComponent.controls.addEventListener("sleep", () => culler.elements.needsUpdate = true)

  // Highlighter
  const highlighter = new OBC.FragmentHighlighter(viewer)
  await highlighter.setup()
  postproduction.customEffects.outlineEnabled = true
  highlighter.outlineEnabled = true
  highlighter.updateHighlight()

  //IfcPropertiesProcessor
  const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
  highlighter.events.select.onClear.add(() => {
    propertiesProcessor.cleanPropertiesList()
  })

  // classifier
  const classifier = new OBC.FragmentClassifier(viewer)
  // model tree
  const modelTree = new OBC.FragmentTree(viewer);
  await modelTree.init();

  // propsFinder
  const propsFinder = new OBC.IfcPropertiesFinder(viewer);
  await propsFinder.init();
  //propsFinder.uiElement.get("queryWindow").visible = true;

  // Zoom Button
  const zoomButton = new OBC.Button(viewer)
  zoomButton.materialIcon = "zoom_in_map"
  zoomButton.tooltip = "Zoom to building"

  //直接在代码中加载模型
  if(fragmentManager.groups.length) return;
  const file = await fetch("/assets/models/bridge/small.frag");
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const model = await fragmentManager.load(buffer);
  const properties = await fetch("/assets/models/bridge/small.json")
  console.log(properties)
  const props = await properties.json()
  model.setLocalProperties(props)
  //使用fragmentBoundingBox
  fragmentBoundingBox.add(model)
  const bbox = fragmentBoundingBox.getMesh();
  fragmentBoundingBox.reset()
  zoomButton.onClick.add(() => {
    controls.fitToSphere(bbox,true)
  })
  await propertiesProcessor.process(model)
  highlighter.events.select.onHighlight.add((selection) => {
    console.log(selection)
    const fragmentID = Object.keys(selection)[0]
    const expressID = Number([...selection[fragmentID]][0])
    console.log("Selected element: ", expressID)
    const fragment = fragmentManager.list[fragmentID]

    if(fragment.group){
      propertiesProcessor.renderProperties(model, expressID)
    }
  })
  await highlighter.updateHighlight()
  classifier.byStorey(model)
  classifier.byEntity(model)

  //modelTree组件
  await modelTree.update(['storeys', 'entities']);
  modelTree.onSelected.add(({ items, visible }) => {
  if(visible) {
  highlighter.highlightByID('select', items, true, true);
  }
  });
  modelTree.onHovered.add(({ items, visible }) => {
  if(visible) {
  highlighter.highlightByID('hover', items);
  }
  });

  //propsFinder组件
  propsFinder.onFound.add((result) => {
    console.log(result);
    highlighter.highlightByID('select', result, true, true);

    //const expressIDs: number[] = [];
    const fragmentIds: string[] = [];
    for (const fragmentID in result) {
      if (result.hasOwnProperty(fragmentID)) {
        fragmentIds.push(fragmentID);
        // for (const num of result[fragmentID]) {
        //   expressIDs.push(num);
        // }
      }
    }
    //console.log(expressIDs);
    console.log(fragmentIds);
    //得到所有的mesh的position,expressIDs对应的是每个sensor的id，要得到与expressIDs对应的position
    const positions:any[] = [];
    for (const fragmentID of fragmentIds) {
      const fragment = fragmentManager.list[fragmentID];
      fragment.instanceToItem.forEach((item,instances) => {
        console.log('item',item);
        console.log('instance',instances);
        let instanceMatrix = new THREE.Matrix4();
        // 得到每个实例的变换矩阵
        fragment.mesh.getMatrixAt(instances, instanceMatrix);
        let position = new THREE.Vector3();
        position.setFromMatrixPosition(instanceMatrix);
        positions.push(position);
      });
      /**
       * const exportData = fragment.mesh.exportData();
      // for (let i = 0; i < exportData.index.length; i++){
      //   let instanceMatrix = new THREE.Matrix4();
      //   // 得到每个实例的变换矩阵
      //   fragment.mesh.getMatrixAt(exportData.index[i], instanceMatrix);
      //   let position = new THREE.Vector3();
      //   position.setFromMatrixPosition(instanceMatrix);
      //   positions.push(position);
      // }
        */
    }
    console.log(positions);
    // 创建精灵对象Sprite
    for (let i = 0; i < positions.length; i++) {
      const sprite = makeTextSprite(`Sensor`, {});
      if (!sprite) return;
      sprite.scale.set(10, 10, 10);
      sprite.position.set(positions[i].x,positions[i].y+10,positions[i].z);
      sceneComponent.get().add(sprite);
    }


  });
  //ifcLoader组件
  ifcLoader.onIfcLoaded.add(async (model) => {
    //添加到culler,经过测试，这个方法会导致有些模型无法显示，建议关闭
    //for (const fragment of model.items){culler.elements.add(fragment.mesh)}
    //使用fragmentBoundingBox
    fragmentBoundingBox.add(model)
    const bbox = fragmentBoundingBox.getMesh();
    fragmentBoundingBox.reset()
    zoomButton.onClick.add(() => {
      controls.fitToSphere(bbox,true)
    })

    //属性处理器
    await propertiesProcessor.process(model)
    //选中高亮，并展示属性
    highlighter.events.select.onHighlight.add((selection) => {
      console.log(selection)
      const fragmentID = Object.keys(selection)[0]
      const expressID = Number([...selection[fragmentID]][0])
      console.log("Selected element: ", expressID)
      propertiesProcessor.renderProperties(model, expressID)
    })
    await highlighter.updateHighlight()
    //culler.elements.needsUpdate = true
  })
  //fragmentManager组件
  fragmentManager.onFragmentsLoaded.add(async (model) => {
    console.log(model)
    //使用fragmentBoundingBox
    fragmentBoundingBox.add(model)
    const bbox = fragmentBoundingBox.getMesh();
    fragmentBoundingBox.reset()
    zoomButton.onClick.add(() => {
      controls.fitToSphere(bbox,true)
    })

    // 检查properties是否已加载
    await propertiesProcessor.process(model)

    highlighter.events.select.onHighlight.add((selection) => {
      console.log(selection)
      const fragmentID = Object.keys(selection)[0]
      const expressID = Number([...selection[fragmentID]][0])
      console.log("Selected element: ", expressID)
      const fragment = fragmentManager.list[fragmentID]
      if(fragment.group){
        propertiesProcessor.renderProperties(model, expressID)
      }
    })
    await highlighter.updateHighlight()
    classifier.byStorey(model)
    classifier.byEntity(model)

    modelTree.update(['storeys', 'entities']);
    modelTree.onSelected.add(({ items, visible }) => {
      if(visible) {
        highlighter.highlightByID('select', items, true, true);
      }
    });
    modelTree.onHovered.add(({ items, visible }) => {
      if(visible) {
        highlighter.highlightByID('hover', items);
      }
    });

  })

  // 以下是UI层面的代码
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

  //使用fragmentManager导入模型
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
    modelTree.uiElement.get("main"),
    propsFinder.uiElement.get("main"),
    loadButton,
    zoomButton
  )
  viewer.ui.addToolbar(mainToolbar)
}
