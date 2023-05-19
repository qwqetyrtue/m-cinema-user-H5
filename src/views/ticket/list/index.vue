<template>
    <div class="ticket-container">
        <van-nav-bar
                :title="$route.meta.title"
                left-text="返回"
                left-arrow
                fixed
                placeholder
                @click-left="$router.back()"
        />
        <van-search v-model="search" shape="round" left-icon="" placeholder="请输入影片名" show-action>
        </van-search>
        <van-tabs v-model="active"
                  title-active-color="#F1364B"
                  title-inactive-color="#000000"
                  line-width="0"
                  line-height="0"
                  @change="activeChangeHandler"
        >
            <van-tab title="待付款" name="reserve">
                <ticket-row v-for="ticket in tickets" :key="ticket.ticketId" :ticket="ticket" right-button="去付款"
                            @right-click="goPayHandler(ticket.orderId)"
                            below-button="申请退订"/>
                <empty-row/>
            </van-tab>
            <van-tab title="待使用" name="paid">
                <ticket-row v-for="ticket in tickets" :key="ticket.ticketId" :ticket="ticket" right-button="检票码"
                            @right-click="goQRCodeHandler(ticket)"
                            below-button="申请退款"/>
                <empty-row/>
            </van-tab>
            <van-tab title="已使用" name="used">
                <ticket-row v-for="ticket in tickets" :key="ticket.ticketId" :ticket="ticket" right-button="查看详情"/>
                <empty-row/>
            </van-tab>
            <van-tab title="已退款" name="refund">
                <ticket-row v-for="ticket in tickets" :key="ticket.ticketId" :ticket="ticket" right-button="详情"/>
                <empty-row/>
            </van-tab>
            <van-tab title="其他" name="accident">
                <ticket-row v-for="ticket in tickets" :key="ticket.ticketId" :ticket="ticket" right-button="详情"/>
                <empty-row/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import TicketRow from "@/views/ticket/components/TicketRow.vue";
import EmptyRow from "@/components/EmptyRow/index.vue";
import {listTicketByStatusReq, payTicketMockReq} from "@/api/ticket";
import {Dialog, ImagePreview, Toast} from "vant";
import order from "@/views/order/index.vue";
import QRCode from "qrcode";

export default {
    name: "Ticket",
    components: {EmptyRow, TicketRow},
    created() {
        this.fetchData()
    },
    mounted() {

    },
    data() {
        return {
            tickets: [],
            search: null,
            active: 'reserve',
            paging: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
        }
    },
    methods: {
        fetchData() {
            listTicketByStatusReq(this.active, this.paging)
                .then(({msg, data}) => {
                    this.tickets = []
                    let index = -1;
                    for (let each of data.list) {
                        index = this.tickets.findIndex(val => val.orderId === each.orderId)
                        if (index === -1)
                            this.tickets.push(each)
                        else {
                            if (this.tickets[index].children == null) {
                                this.tickets[index].group = true
                                this.tickets[index].children = []
                                this.tickets[index].children.push({
                                    price: this.tickets[index].price,
                                    inHallLocation: this.tickets[index].inHallLocation,
                                    ticketId: this.tickets[index].ticketId
                                })
                                delete this.tickets[index].price
                                delete this.tickets[index].inHallLocation
                                delete this.tickets[index].ticketId
                            }
                            this.tickets[index].children.push({
                                price: each.price,
                                inHallLocation: each.inHallLocation,
                                ticketId: each.ticketId
                            })
                        }
                    }
                    console.log(this.tickets)
                })
        },
        activeChangeHandler(name, title) {
            console.log(this.active)
            this.fetchData();
        },
        goPayHandler(orderId) {

            Dialog.confirm({
                title: '测试付款功能',
                message: `票务编号: ${orderId},是否付款`,
            })
                .then(() => {
                    payTicketMockReq(orderId)
                        .then(({msg, data}) => {
                            Toast.success("支付成功");
                        })
                        .then(() => this.fetchData())
                })
        },
        async generaQRC(datas) {
            let urls = []
            for (const data of datas) {
                let url = await new Promise((resolve, reject) => {
                    QRCode.toDataURL(data, (err, dataURL) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dataURL);
                        }
                    });
                })
                urls.push(url)
            }
            return urls
        },
        async goQRCodeHandler(ticket) {
            let datas = []
            if (ticket.group) {
                ticket.children.forEach(child => {
                    datas.push(`${this.$store.state.auth.user.userId};${ticket.orderId};${child.ticketId}`)
                })
            } else {
                datas = [`${this.$store.state.auth.user.userId};${ticket.orderId};${ticket.ticketId}`]
            }
            this.generaQRC(datas)
                .then(urls => {
                    ImagePreview(urls);
                })
        }
    }
}
</script>

<style lang="scss">
.ticket-container {
  .van-tabs__wrap {
    width: 80vw;
    margin: 0 auto;
    background-color: transparent;

    div {
      background-color: transparent;
    }
  }

  .van-tabs__content {
    padding: 0 10px;
  }

  .ticket-row {
    margin-bottom: 10px;
  }
}
</style>
