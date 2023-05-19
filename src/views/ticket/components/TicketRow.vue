<template>
    <van-cell-group class="ticket-row">
        <van-cell size="large">
            <template #title>
                <van-row style="height: 100%;">
                    <van-col span="8" class="ticket-img">
                        <van-image height="100%" width="100%" fit="fill" src="/img/shenghai.jpg"></van-image>
                    </van-col>
                    <van-col offset="1" span="15" class="ticket-detail">
                        <van-row class="ticket-detail-name">{{ ticket.filmName }}
                            <br/>
                            {{ !ticket.group ? '1' : `${ticket.children.length}` }}张
                        </van-row>
                        <van-row class="ticket-detail-time">{{ formatDateTime(ticket.beginTime) }}</van-row>
                        <van-row class="ticket-detail-loc">
                            {{ ticket.hallName }}
                            <span v-if="!ticket.group">{{ ticket.inHallLocation }}</span>
                        </van-row>
                    </van-col>
                </van-row>
            </template>
            <template #default>
                <van-row class="ticket-check">
                    <van-button v-if="RightButton" color="#F1364B" round size="small" style="letter-spacing: 1px;"
                                @click="buttonHandler('right-click')">
                        {{ RightButton }}
                    </van-button>
                </van-row>
            </template>

        </van-cell>
        <van-cell>
            <template #title>
                <van-row class="ticket-price">
                    总价:
                    <span v-if="!ticket.group">{{ ticket.price }}</span>
                    <span v-else>{{ getPrice() }}</span>
                    元
                </van-row>
            </template>
            <template #default>
                <van-row class="ticket-service">
                    <van-button v-if="BelowButton" color="#ACACAC" size="small" round :text="BelowButton" plain
                                @click="buttonHandler('below-click')"/>
                </van-row>
            </template>
        </van-cell>
    </van-cell-group>
</template>

<script>
export default {
    name: "TicketRow",
    props: {
        RightButton: {
            type: String,
            default: null
        },
        BelowButton: {
            type: String,
            default: null
        },
        ticket: {
            type: Object,
            default: null
        }
    },
    methods: {
        buttonHandler(name) {
            this.$emit(name)
        },
        formatDateTime(dateTimeStr) {
            let weekdays = ['日', '一', '二', '三', '四', '五', '六'];
            let dateObj = new Date(dateTimeStr);

            let weekday = weekdays[dateObj.getDay()];
            let month = dateObj.getMonth() + 1;
            let date = dateObj.getDate();
            let hours = dateObj.getHours();
            hours = hours > 10 ? `${hours}` : `0${hours}`
            let minutes = dateObj.getMinutes();
            minutes = minutes > 10 ? `${minutes}` : `0${minutes}`
            return `周${weekday} ${month}月${date}日 ${hours}:${minutes}`;
        },
        getPrice() {
            let res = 0
            this.ticket.children.forEach(val => {
                res += val.price
            })
            return res
        }
    }
}
</script>

<style lang="scss">
.ticket-row {
  padding: 5px 5px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);


  .van-cell__title {
    flex: 3;
    overflow: hidden;
  }

  .van-cell__value {
    flex: 1;
    overflow: hidden;
  }

  .ticket-detail {
    height: 100%;
  }

  .ticket-detail-name, .ticket-detail-loc, .ticket-detail-time, .ticket-detail-num {
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 超出部分显示省略号 */
  }


  .ticket-detail-name {
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    display: flex;
    align-items: center;
    height: 50%;
    width: 100%;
  }


  .ticket-detail-time {
    height: 20%;
    font-weight: bold;
    font-size: 12px;
    color: #7C7C7C;
  }

  .ticket-detail-loc {
    height: 30%;
    font-weight: 500;
    font-size: 12px;
    color: #9C9C9C;
    line-height: 14px;
    -webkit-line-clamp: 2;
  }

  .ticket-price {
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    color: #9C9C9C;
    font-size: 14px;

    span {
      margin-left: 10px;
    }
  }

  .ticket-check {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .ticket-service {
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;

    .van-button {
      height: 28px;
      padding: 0 10px;
    }

  }

}
</style>
