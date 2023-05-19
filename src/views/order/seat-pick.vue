<template>
    <div class="seat-pick-container" v-if="scene">
        <van-nav-bar
                :left-text="scene.hallName"
                left-arrow
                @click-left="$router.back()"
        />
        <div class="seat-pick-panel">
            <seat-arrange @seat-change="seatChangeHandler" :selected="pickedSeat" :arrange="scene.seatArrange"
                          :choose-arrange="scene.seatChooseArrange"
                          :reserved="seatReserved"/>
        </div>
        <van-cell-group class="order-panel">
            <van-cell>
                <template #title>
                    <van-row>
                        <van-col span="18">{{ scene.filmName }}</van-col>
                        <van-col span="6" style="color: #afafaf;">
                            {{ getTimePart(scene.beginTime) + '~' + getTimePart(scene.endTime) }}
                        </van-col>
                    </van-row>
                </template>
                <template #label>
                    <van-row>
                        <van-col span="19">
                            {{ scene.day }}
                        </van-col>
                        <van-col span="5">
              <span @click="showTime = true" v-if="!showTime">
                显示场次
                <van-icon name="arrow-down"/>
              </span>
                            <span @click="showTime = false" v-else>
                收起场次
               <van-icon name="arrow-up"/>
              </span>

                        </van-col>
                    </van-row>
                </template>
            </van-cell>
            <van-cell value-class="scene-row" v-show="showTime">
                <template v-for="scene in scenes">
                    <div v-if="isCurrentScene(scene.sceneId)" :key="scene.sceneId"
                         class="scene-row-item current-scene">
                        <div class="time">{{ getTimePart(scene.beginTime) }}</div>
                        <div class="language">{{ scene.language }}|{{ scene.sceneType }}</div>
                        <div class="price">{{ scene.price }}元起</div>
                    </div>
                    <div v-else :key="scene.sceneId"
                         class="scene-row-item"
                         @click="changeSceneHandler(scene.sceneId)">
                        <div>{{ getTimePart(scene.beginTime) }}</div>
                        <div>{{ scene.language }}|{{ scene.sceneType }}</div>
                        <div>{{ scene.price }}元起</div>
                    </div>
                </template>

            </van-cell>

            <van-cell value-class="picked-row">
                <div v-if="pickedSeat.length === 0">
                    请选座
                </div>
                <div v-for="seat in pickedSeat" :key="seat.row + ','  + seat.col" :class="['picked-row-item',]">
                    <div>
                        <div>{{ `${seat.row}排,${seat.col}座` }}</div>
                        <div>40元</div>
                    </div>
                    <div>
                        <van-icon name="cross" @click="removeSeatHandler(seat)"/>
                    </div>
                </div>
            </van-cell>
        </van-cell-group>


        <van-tabbar ref="container" style="padding: 2px 15px;box-sizing: border-box;" placeholder>
            <van-button block round color="linear-gradient(to right,#FB3433,#FE5067)" @click="submitOrderHandler">
                确认选座
            </van-button>
        </van-tabbar>
    </div>
</template>

<script>
import SeatArrange from "@/views/order/components/SeatArrange.vue";
import {sceneDetailReq, filmDaySceneReq} from "@/api/scene";
import {getTimePart} from "@/utils";
import {orderTicketReq} from "@/api/ticket";
import {Toast} from "vant";
import {listReservedSeatReq} from "@/api/seat";


export default {
    components: {SeatArrange},
    mounted() {
        this.container = this.$refs.container;
    },
    created() {

        this.sceneId = this.$route.params.sceneId
        if (this.sceneId == null) this.$router.back()

        this.fetchData(this.sceneId)
    },
    name: "SeatPick",
    data() {
        return {
            container: null,
            day: null,
            sceneId: null,
            scene: null,
            scenes: [],
            showTime: false,
            pickedSeat: [],
            seatReserved: [],
        }
    },
    methods: {
        fetchData(sceneId) {
            sceneDetailReq(sceneId)
                .then(({msg, data}) => {
                    this.scene = data
                })
                .then(() => listReservedSeatReq(sceneId))
                .then(({msg, data}) => {
                    this.seatReserved = data
                })
                .then(() => filmDaySceneReq(this.scene.filmId, this.scene.day))
                .then(({msg, data}) => {
                    this.scenes = data.list
                })
        },
        getTimePart,
        seatChangeHandler(data) {
            let index = this.pickedSeat.findIndex(val => val.row === data.row && val.col === data.col);
            if (index !== -1)
                this.pickedSeat.splice(index, 1);
            else
                this.pickedSeat.push(data)
        },
        removeSeatHandler(seat) {
            let index = this.pickedSeat.findIndex(val => val.row === seat.row && val.col === seat.col);
            this.pickedSeat.splice(index, 1);
        },
        changeSceneHandler(sceneId) {
            this.pickedSeat = []
            this.fetchData(sceneId)
        },
        isCurrentScene(sceneId) {
            return this.scene.sceneId === sceneId
        },
        submitOrderHandler() {
            let inHallIndexList = []
            for (let each of this.pickedSeat)
                inHallIndexList.push(this.scene.seatArrange[each.row - 1][each.col - 1])
            let sceneId = this.scene.sceneId
            orderTicketReq(sceneId, inHallIndexList)
                .then(({msg, data}) => {
                    Toast( {
                        message: msg + ' 条数:' + data,
                        type: "success",
                        duration: 1000 * 2,
                        overlay: true,
                        onClose: function (){
                            this.$router.go(0)
                        }.bind(this)
                    })
                })
        },
    }
}
</script>

<style lang="scss">
.seat-pick-container {
  padding: 0 10px;
  overflow: hidden;
  position: relative;

  .seat-pick-panel {
    height: 320px;
    overflow: hidden;
    width: 100%;
  }

  .order-panel {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);

    .scene-row-item, .picked-row-item {
      display: inline-block;
      height: 45px;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: 0 5px;
      font-size: 12px;
      line-height: 14px;
      padding: 5px 10px;
    }


    .scene-row, .picked-row {
      white-space: nowrap;
      overflow-x: scroll;
      padding: 10px 10px 10px 0;
    }

    .current-scene {
      border: 1px solid #0c7aee;
    }

    .scene-row {
      width: 100%;
      height: 55px;
      margin-bottom: 5px;

    }

    .picked-row {
      width: 100%;
      min-width: 1px;
      height: 55px;
      margin-bottom: 5px;
    }
  }
}
</style>
