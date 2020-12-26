<template>
  <div
    class="flowchart"
    ref="flowchart"
  >
    <div
      v-for="(node,index) in nodes"
      :key="index"
      class="node"
      :style="{width:node.width+'px',height:node.height+'px'
      ,left:node.x+'px',top:node.y+'px'}"
      @mousedown="handleNodeMouseDown($event,node)"
    > {{node.text}}</div>
    <svg
      class="svg"
      ref="svg"
    >
      <rect
        class="selection"
        height="0"
        width="0"
      ></rect>
    </svg>
  </div>
</template>

<script>
  import { line2, lineTo } from "../utils/svg";
  import * as d3 from "d3";
  export default {
    name: "flowchart",
    data() {
      return {
        nodes: [
          {
            id: 1,
            text: "node1",
            type: 0,
            width: 50,
            height: 50,
            x: 50,
            y: 30,
          },
          {
            id: 2,
            text: "node2",
            type: 0,
            width: 200,
            height: 100,
            x: 500,
            y: 50,
          },
          {
            id: 3,
            text: "node3",
            type: 0,
            width: 200,
            height: 20,
            x: 500,
            y: 200,
          },
        ],
        lines: [
          { from: 1 ,to: 2, fd: "bottom", td: "left" },
          { from: 1, to: 3, fd: "right", td: "bottom" },
        ],
      };
    },
    mounted() {
      //   this.$$nextTick(() => {});
      //   document.body.addEventListener()
      (window.onmousemove = (e) => {
        this.handleNodeMouseMove(e);
      }),
        (window.onmouseup = (e) => {
          this.handleNodeMouseUp(e);
        }),
        this.$nextTick(() => {
          for (var i = 0; i < this.lines.length; i++) {
            var l = this.lines[i];
            this.drawLine(l);
          }
        });
    },
    destroyed() {
      window.onmousemove = null;
      window.onmouseup = null;
    },
    methods: {
      drawLine(l) {
        var f = this.nodes.find((n) => n.id == l.from);
        var p1 = this.getpoint(f, l.fd);
        var t = this.nodes.find((n) => n.id == l.to);
        var p2 = this.getpoint(t, l.td);
        if (l.g) l.g.remove();
        let svg = d3.select(this.$refs.svg);
        l.g = svg.insert("g", ".selection");
        l.data = line2(
          l.g,
          p1.x,
          p1.y,
          p2.x,
          p2.y,
          l.fd,
          l.td,
          1,
          "#a3a3a3",
          true
        );
        console.log(l.g);
        console.log(l.g.size());
      },
      getpoint(node, d) {
        switch (d) {
          case "top":
            return { x: node.x + node.width / 2, y: node.y - 2};
          case "bottom":
            return { x: node.x + node.width / 2, y: node.y + node.height };
          case "left":
            return { x: node.x - 2, y: node.y + node.height / 2 };
          case "right":
            return { x: node.x + node.width , y: node.y + node.height / 2 };
        }
      },
      handleNodeMouseDown(e, node) {
        e.stopPropagation();
        e.preventDefault();
        if (e.ctrlKey) return;
        this.selectionInfo = {
          clientX: e.clientX,
          clientY: e.clientY,
          x: node.x,
          y: node.y,
        };
        this.selection = node;
        this.optiontype = 1; //1 移动节点
      },
      handleNodeMouseMove(e) {
        switch (this.optiontype) {
          case 1:
            this.selection.x =
              e.clientX - this.selectionInfo.clientX + this.selectionInfo.x;
            this.selection.y =
              e.clientY - this.selectionInfo.clientY + this.selectionInfo.y;
            for (var i = 0; i < this.lines.length; i++) {
              var l = this.lines[i];
              if (l.from == this.selection.id || l.to == this.selection.id)
                this.drawLine(l);
            }
            break;
        }
      },
      handleNodeMouseUp() {
        this.optiontype = 0; //0 不操作
      },
    },
  };
</script>

<style scoped>
  .flowchart {
    width: 100%;
    height: 100%;
    border: 1px #c1bbbb dashed;
  }
  .svg {
    background-size: 20px 20px, 20px 20px, 10px 10px, 10px 10px;
    background-image: linear-gradient(to right, #dfdfdf 1px, transparent 1px),
      linear-gradient(to bottom, #dfdfdf 1px, transparent 1px),
      linear-gradient(to right, #f1f1f1 1px, transparent 1px),
      linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
    background-position: left -1px top -1px, left -1px top -1px,
      left -1px top -1px, left -1px top -1px;
    height: 100%;
    width: 100%;
  }
  .node {
    position: absolute;
    border: 1px #c1bbbb;
    border-style: solid;
    background-color: white;
    border-radius: 4px;
    z-index: 1;
    word-break:break-all;
  }
</style>