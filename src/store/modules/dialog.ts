import { defineStore } from "pinia";

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */

export const useDialogStore: any = defineStore({
  id: "Dialog",
  state: () => ({
    dialogVisible: false,
    XY: [0, 0],
    LouInfo: {} as any,
    title: "详细信息",
    // 内容
    content: [],
    lastEvent: {} as PointerEvent,
    tag: "",
    initId: "",
  }),
  actions: {
    setDialogVisible(dialogVisible: boolean) {
      this.$patch({
        dialogVisible,
      });
      //隐藏就销毁原有数据
      !dialogVisible &&
      this.$patch({
        content: [],
      });
    },
    setXY(XY: Array<any>) {
      this.$patch({
        XY,
      });
    },
    setLastEvent(lastEvent: any) {
      this.$patch({
        lastEvent,
      });
    },
    setDialogInfo(LouInfo: any) {
      this.$patch({
        LouInfo,
      });
    },
    setTitle(title: string) {
      this.$patch({
        title,
      });
    },
    setContent(content: Array<any>) {
      console.log(content, "setContent");
      this.$patch({
        content,
      });
    },
    setTag(tag: string) {
      this.$patch({
        tag,
      });
    },
    setInitId(initId: any) {
      this.$patch({
        initId,
      });
    },
  },
});