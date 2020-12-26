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
      @mousedown="handleNodeMouseDown($event,node,1)"
    >
      <div class="horizontal top" @mousedown="handleNodeMouseDown($event,node,2,'top')"></div>
      <div class="horizontal bottom" @mousedown="handleNodeMouseDown($event,node,2,'bottom')"></div>
      <div class="vertical left" @mousedown="handleNodeMouseDown($event,node,2,'left')"></div>
      <div class="vertical right" @mousedown="handleNodeMouseDown($event,node,2,'right')"></div>
      
      <div class="content"> 
          <div class="header">{{node.type}}</div>
          <div class="body">
            <textarea @mousedown="$event.stopPropagation();" class="edit" v-model="node.text" />
          </div>
      </div>
    </div>
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
            type: "read",
            width: 120,
            height: 55,
            x: 50,
            y: 50,
          },
          {
            id: 2,
            text: "node2",
            type: "read",
            width: 120,
            height: 55,
            x: 500,
            y: 50,
          },
          {
            id: 3,
            text: "node3",
            type: "write",
            width: 120,
            height: 55,
            x: 500,
            y: 200,
          },
        ],
        lines: [
          { from: 2, to: 1, fd: "top", td: "top" },
          { from: 1, to: 3, fd: "bottom", td: "bottom" },
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
            return { x: node.x + node.width / 2, y: node.y - 2 };
          case "bottom":
            return { x: node.x + node.width / 2, y: node.y + node.height -2 };
          case "left":
            return { x: node.x, y: node.y + node.height / 2 };
          case "right":
            return { x: node.x + node.width, y: node.y + node.height / 2 };
        }
      },
      handleNodeMouseDown(e, node,type,d) {
        e.stopPropagation();
        e.preventDefault();
        if (e.ctrlKey) return;
        this.selectionInfo = {
          clientX: e.clientX,
          clientY: e.clientY,
          x: node.x,
          y: node.y,
          width:node.width,
          height:node.height
        };
        this.selection = node;
        this.optiontype = type; //1 移动节点 2 调整node大小
        this.moved = d; 
      },
      drawCurLine(){
          for (var i = 0; i < this.lines.length; i++) {
              var l = this.lines[i];
              if (l.from == this.selection.id || l.to == this.selection.id)
                this.drawLine(l);
            }
      },
      handleNodeMouseMove(e) {
        switch (this.optiontype) {
          case 1: //1 移动节点
            this.selection.x =
              e.clientX - this.selectionInfo.clientX + this.selectionInfo.x;
            this.selection.y =
              e.clientY - this.selectionInfo.clientY + this.selectionInfo.y;
            this.drawCurLine();
            break;
          case 2:
              this.changeNodeSize(e);
              this.drawCurLine();
              break;
          default:
            break;
        }
      },
      changeNodeSize(e){
          switch(this.moved){
                  case "right":
                      this.selection.width = e.clientX - this.selectionInfo.clientX + this.selectionInfo.width;
                      if(this.selection.width<20) this.selection.width=20;
                      break;
                  case "left":
                      this.selection.width = this.selectionInfo.clientX - e.clientX + this.selectionInfo.width;
                      if(this.selection.width<20) this.selection.width=20;
                      else this.selection.x = e.clientX - this.selectionInfo.clientX + this.selectionInfo.x;
                      break;
                  case "top":
                      this.selection.height = this.selectionInfo.clientY - e.clientY + this.selectionInfo.height;
                      if(this.selection.height<55) this.selection.height=55;
                      else this.selection.y = e.clientY - this.selectionInfo.clientY + this.selectionInfo.y;
                      break;
                  case "bottom":
                      this.selection.height =  e.clientY - this.selectionInfo.clientY + this.selectionInfo.height;
                      if(this.selection.height<55) this.selection.height=55;
                      break;
              }
      },
      handleNodeMouseUp() {
        this.optiontype = 0; //0 不操作
      },
    },
  };
</script>

<style lang='scss' scoped>
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

    z-index: 1;
    word-break: break-all;
    
    .content {
      border: 1px #c1bbbb;
      border-style: solid;
      background-color: white;
      border-radius: 4px;
      position: absolute;
      top:1px;
      left:1px;
      right:1px;
      bottom: 1px;
      cursor: all-scroll;
      .header{
        width: 100%;
        height: 19px;
        border-bottom: 1px #b3b0b0 solid;
      }
      .body{
          position: absolute;
          top:20px;
          left: 0;
          right: 0;
          bottom: 0;
      }
      .edit{
          height: 100%;
          width: 100%;
          padding: 0;
          border: none;
          border-radius: 4px;
          resize : none;
          outline:none;
          overflow: hidden;
      }
    }
    .horizontal{
        position: absolute;
        width: 100%;
        height: 3px;
        z-index: 2;
        cursor: row-resize;
    }
    .vertical{
        position: absolute;
        height: 100%;
        width: 3px;
        cursor: col-resize;
        z-index: 2;
    }
    .top{
        top:0;
    }
    .bottom{
        bottom: 0;
    }
    .left{
        left:0;
    }
    .right{
        right:0;
    }
  }
</style>