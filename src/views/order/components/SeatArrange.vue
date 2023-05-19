<template>
    <div class="seat-arrange" ref="container">
        <div class="move"
             :style="{ transform: `scale(${scale})`,top: top +'px',left: left + 'px'}"
             @panmove="onPanMove"
             @pinch="onPinch"
        >
            <div v-if="arrange" class="move-row" v-for="row in arrange.length" :key="'row' + row">
                <div class="move-row-point">第{{ row }}排</div>
                <template v-for="col in arrange[row-1].length">
                    <div v-if="isBlock({row: row -1,col: col -1})" :key="'col' + col"
                         class="move-col  move-col-block"/>
                    <div v-else-if="isReserved({row: row -1,col: col -1})" class="move-col move-col-reserved">
                        {{ row }}-{{ col }}
                    </div>
                    <div v-else :key="'col' + col" :class="['move-col',
                        isSelect({row: row, col:col})?'move-col-select':'']"
                         @tap="seatSelectHandler({row: row, col:col})">
                        {{ row }}-{{ col }}
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
import AnyTouch from 'any-touch';

export default {
    name: "SeatArrange",
    mounted() {
        const at = new AnyTouch(this.$refs.container, {preventDefault: true});
        //  destroy
        this.$on('hook:destroyed', () => {
            at.destroy();
        });
    },
    props: {
        selected: {
            type: Array,
            default: () => []
        },
        ChooseArrange: {
            type: Array,
            default: () => []
        },
        arrange: {
            type: Array,
            default: () => []
        },
        reserved: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            scale: 0.5,
            top: 0,
            left: 0,
        }
    },
    methods: {
        onPinch(e) {
            // console.log(e)
            this.scale = Math.round(this.scale * e.deltaScale * 100) / 100;
        },
        onPanMove(ev) {
            ev.currentTarget.setAttribute('at', ev.type);
            this.top = parseInt(this.top) + ev.deltaY;
            this.left = parseInt(this.left) + ev.deltaX;
        },
        seatSelectHandler(seat) {
            this.$emit('seat-change', seat)
        },
        isSelect(seat) {
            return this.selected.findIndex(val => val.row === seat.row && val.col === seat.col) !== -1
        },
        isBlock(seat) {
            return this.arrange[seat.row][seat.col] === -1
        },
        isReserved(seat) {
            return this.ChooseArrange[seat.row][seat.col] === 0 || this.reserved.indexOf(this.arrange[seat.row][seat.col]) !== -1
        }
    }
}
</script>

<style lang="scss">
.seat-arrange {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .move {
    position: absolute;
    padding: 10px;
    background-color: #eeeeee;
    border-radius: 10px;
    transform-origin: 0 0;

    .move-row {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
    }

    .move-row-point {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #2789e8;
    }

    .move-col {
      width: 50px;
      height: 50px;
      margin: 10px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .move-col-select {
      border: 5px solid #2789e8;
    }

    .move-col-reserved {
      background-color: #b0b0b0;
        color: #ab2624;
    }

    .move-col-block {
      background-color: transparent;
    }
  }
}
</style>
