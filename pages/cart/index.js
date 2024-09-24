/*
--------------购物车页面----------------


1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

  2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
    1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address
      scope 值 true 直接调用 获取收货地址
    2 假设 用户 从来没有调用过 收货地址的api
      scope undefined 直接调用 获取收货地址
    3 假设 用户 点击获取收货地址的提示框 取消
      scope 值 false
      1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候
      2 获取收货地址
    4 把获取到的收货地址 存入到 本地存储中
2 页面加载完毕
  0 onLoad  onShow
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
3 onShow
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
    1 num=1;
    2 checked=true;
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中
4 全选的实现 数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
5 总价格和总数量
  1 都需要商品被选中 我们才拿它来计算
  2 获取购物车数组
  3 遍历
  4 判断商品是否被选中
  5 总价格 += 商品的单价 * 商品的数量
  5 总数量 +=商品的数量
  6 把计算后的价格和数量 设置回data中即可
6 商品的选中
  1 绑定change事件
  2 获取到被修改的商品对象
  3 商品对象的选中状态 取反
  4 重新填充回data中和缓存中
  5 重新计算全选。总价格 总数量。。。
7 全选和反选
  1 全选复选框绑定事件 change
  2 获取 data中的全选变量 allChecked
  3 直接取反 allChecked=!allChecked
  4 遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
  5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中
8 商品数量的编辑
  1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性
    1 “+” "+1"
    2 "-" "-1"
  2 传递被点击的商品id goods_id
  3 获取data中的购物车数组 来获取需要被修改的商品对象
  4 当 购物车的数量 =1 同时 用户 点击 "-"
    弹窗提示(showModal) 询问用户 是否要删除
    1 确定 直接执行删除
    2 取消  什么都不做
  4 直接修改商品对象的数量 num
  5 把cart数组 重新设置回 缓存中 和data中 this.setCart
9 点击结算
  1 判断有没有收货地址信息
  2 判断用户有没有选购商品
  3 经过以上的验证 跳转到 支付页面！
 */

// 精确的数值计算
import NP from 'number-precision'
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address: {}, // 收获地址
    cart: [], // 购物车
    allChecked: false, // 是否全选
    totalPrice: 0, // 总价
    totalNum: 0 // 总数量
  },
  onShow() {
    console.log('cart----show')
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");

    // 2 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setCart(cart);

  },
  // 点击 收货地址
  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      // 用户授权设置信息
      const res1 = await getSetting();
      // 是否授权通讯地址，已取消此项授权，会默认返回true
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      console.log('address', address)

      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },

  // 商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

  },

  /**
   * 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
   * @param {Array} cart
   */
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    // 2. 遍历购物车中的商品
    cart.forEach(item => {
      if (item.checked) {
        // 2.1 只要选中则计入总数和总价格
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      } else {
        // 2.1 购物车🛒中只要有没有选中的，则全选不勾选☑️
        allChecked = false;
      }
    })
    // 3. 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;

    // 4. 修改本地数据
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });

    // 5. 重新存储到本地存储中
    wx.setStorageSync("cart", cart);
  },

  // 商品全选功能
  handleAllCheck() {
    // 1 获取data中的数据
    let { cart, allChecked } = this.data;

    // 2 修改值
    allChecked = !allChecked;

    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);

    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {


    // 1 获取传递过来的参数
    const { operation, id } = e.currentTarget.dataset;
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 4 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // 4.1 弹窗提示
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      // 4  进行修改数量
      cart[index].num += operation;
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },
  // 点击 结算
  async handlePay(){
    // 1 判断收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({ title: "您还没有选择收货地址" });
      return;
    }
    // 2 判断用户有没有选购商品
    if(totalNum === 0){
      await showToast({ title:"您还没有选购商品" });
      return ;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  }
})