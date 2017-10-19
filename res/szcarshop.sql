/*
Navicat MySQL Data Transfer

Source Server         : 47.94.196.117_3306
Source Server Version : 50717
Source Host           : 47.94.196.117:3306
Source Database       : szcarshop

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-19 20:43:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for active
-- ----------------------------
DROP TABLE IF EXISTS `active`;
CREATE TABLE `active` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `context` varchar(255) DEFAULT NULL,
  `time_keep` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of active
-- ----------------------------
INSERT INTO `active` VALUES ('1', '2017-05-10', '沈辽路万达', '2017-05-20', '立享全城低价，无隐形消费', '1499522400', '1', '2017/06/16/1735501198948556.jpg', 'xxxxxxx', null, '2017-05-20', '2017/06/16/1735591009687746.jpg');

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `remark` text,
  `role_id` int(11) DEFAULT NULL,
  `login_times` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  `role` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '小米', '2017-05-25 14:53:01', '拥有至高无上的权利	', '1', null, null, null, '1');
INSERT INTO `admin` VALUES ('2', 'admin1', '21232f297a57a5a743894a0e4a801fc3', '用户', '2017-09-13 00:36:27', null, null, null, null, null, '2');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `active_id` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL COMMENT 'QQ号',
  `phone` varchar(255) DEFAULT NULL COMMENT '联系方式',
  `type` varchar(255) DEFAULT NULL COMMENT '车型：类别',
  `acitiv` varchar(255) DEFAULT NULL COMMENT '车型：动力',
  `style` varchar(255) DEFAULT NULL COMMENT '车型：款式',
  `model` varchar(255) DEFAULT NULL COMMENT '车型：型号',
  `color` varchar(255) DEFAULT NULL COMMENT '颜色',
  `lowPrice` decimal(10,2) DEFAULT NULL COMMENT '已知购车最低价',
  `lickPrice` decimal(10,0) DEFAULT NULL COMMENT '意向落地价',
  `loan` varchar(255) DEFAULT NULL COMMENT '贷款：全款/贷款',
  `num` int(11) DEFAULT NULL COMMENT '贷款期数',
  `location` varchar(255) DEFAULT NULL COMMENT '需要上哪里的牌照',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------

-- ----------------------------
-- Table structure for bbs
-- ----------------------------
DROP TABLE IF EXISTS `bbs`;
CREATE TABLE `bbs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `car_id` int(11) DEFAULT NULL COMMENT '记录此车有哪些人发布了交流',
  `share_date` varchar(255) DEFAULT NULL COMMENT '分享日期',
  `comment` text COMMENT '心得',
  `buy_date` varchar(255) DEFAULT NULL COMMENT '购买日期',
  `buy_price` varchar(255) DEFAULT NULL COMMENT '购买价格',
  `isPass` int(11) DEFAULT NULL COMMENT '是否审核通过,0-通过，1-未通过',
  `url` varchar(255) DEFAULT NULL COMMENT '封面图',
  `user_id` int(11) DEFAULT NULL COMMENT '用户',
  `zan` int(255) DEFAULT NULL COMMENT '赞',
  `createTime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bbs
-- ----------------------------
INSERT INTO `bbs` VALUES ('1', 'test', '1', null, ' <p>因为家庭需要，购车提上了日程。</p><p>首先是选择车型。各种车型对比，品牌选择，最后还是考虑选择丰田凯美瑞。考虑到更多的是周末家庭市内出行，所以没有考虑太大容量的SUV，但是仍然希望空间大一些，看到推广较多的就是日系三杰了。三家反复对比了一下，也去4S店看过车，差别不是很大，整体分析下来还是觉得凯美瑞性价比最高，而且也有比较漂亮的红色，于是就这么定了车型。</p><p>剩下的就是怎么买车的问题了。选车型的时候看了很多网站，各大网站对于车型的介绍大同小异，用的比较多的就是汽车之家了。但是汽车之家上面看资料还行，询价之后商家一般都是给个电话约看车，没有真正报价，所以营销的意义更强一些，影响了购买热情。后来找到了易车APP，看到有付费询价，感觉可以尝试一下。申请报价之后，很快就有几个商家给报了详细的价格，包括裸车价、保险等等。综合对比之后选择了其中一家，约定了时间去看车，并且提前给购车顾问电话了解了一些购车细节。去的当天就谈好了，后面就是下定、等车、提车的过程了。4S店还是很专业的，整个服务过程感觉都很顺利，整个过程下来，感觉很满意。</p><p>目前车已到手，车的外观靓丽，开起来也很舒服。不是很懂车，所以对于车的性能就不评价了。整体下来，买车的过程，提车的愉悦，开车的舒服，都让我觉得这一次的选择是很值得的。</p>', null, null, '0', '2017/07/22/d53157jb54jn85f0e88f.jpg', null, null, null);
INSERT INTO `bbs` VALUES ('2', 'dasd', '1', null, ' <p>因为家庭需要，购车提上了日程。</p><p>首先是选择车型。各种车型对比，品牌选择，最后还是考虑选择丰田凯美瑞。考虑到更多的是周末家庭市内出行，所以没有考虑太大容量的SUV，但是仍然希望空间大一些，看到推广较多的就是日系三杰了。三家反复对比了一下，也去4S店看过车，差别不是很大，整体分析下来还是觉得凯美瑞性价比最高，而且也有比较漂亮的红色，于是就这么定了车型。</p><p>剩下的就是怎么买车的问题了。选车型的时候看了很多网站，各大网站对于车型的介绍大同小异，用的比较多的就是汽车之家了。但是汽车之家上面看资料还行，询价之后商家一般都是给个电话约看车，没有真正报价，所以营销的意义更强一些，影响了购买热情。后来找到了易车APP，看到有付费询价，感觉可以尝试一下。申请报价之后，很快就有几个商家给报了详细的价格，包括裸车价、保险等等。综合对比之后选择了其中一家，约定了时间去看车，并且提前给购车顾问电话了解了一些购车细节。去的当天就谈好了，后面就是下定、等车、提车的过程了。4S店还是很专业的，整个服务过程感觉都很顺利，整个过程下来，感觉很满意。</p><p>目前车已到手，车的外观靓丽，开起来也很舒服。不是很懂车，所以对于车的性能就不评价了。整体下来，买车的过程，提车的愉悦，开车的舒服，都让我觉得这一次的选择是很值得的。</p>', null, null, '0', '2017/07/22/d53157jb54jn85f0e88f.jpg', null, null, null);

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `context` text,
  `zan` int(11) DEFAULT NULL,
  `post` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '买车人的选择', '', '1', null, '0', null, null, null);

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `letter` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `display` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------
INSERT INTO `brand` VALUES ('19', '2017/06/13/64qk6s232v92m4499cmk.png', '奥迪', 'A', '1', '1', '11', null);
INSERT INTO `brand` VALUES ('20', '2017/06/13/k3y8826ijijwp51i58uz.png', '本田', 'B', '1', '2', '11', null);
INSERT INTO `brand` VALUES ('21', '2017/06/13/ghio9t6hi90l6aif2cz3.png', '别克', 'B', '1', '3', '11', null);
INSERT INTO `brand` VALUES ('22', '2017/06/13/e2wrihc21y0bx59bs1b4.png', '宝马', 'B', '1', '4', '11', null);
INSERT INTO `brand` VALUES ('23', '2017/06/13/4vaz0bv6mkptwc369j7z.png', '奔驰', 'B', '1', '5', '11', null);
INSERT INTO `brand` VALUES ('24', '2017/06/13/3m3488x05ng7f446a973.png', '比亚迪', 'B', '1', '6', '11', null);
INSERT INTO `brand` VALUES ('25', null, '标致', 'B', '1', '7', '11', null);
INSERT INTO `brand` VALUES ('26', null, '北京', 'B', '1', '8', '11', null);
INSERT INTO `brand` VALUES ('27', null, '北汽绅宝', 'B', '1', '9', '11', null);
INSERT INTO `brand` VALUES ('28', '2017/06/13/08lqd4o9008w4l126v90.png', '长安', 'C', '1', '10', '11', null);
INSERT INTO `brand` VALUES ('29', null, '长安欧尚', 'C', '1', '11', '11', null);
INSERT INTO `brand` VALUES ('30', null, '长城', 'C', '1', '12', '11', null);
INSERT INTO `brand` VALUES ('31', '2017/06/13/4h4kty4cw07nq92wmv7j.png', '大众', 'D', '1', '13', '11', null);
INSERT INTO `brand` VALUES ('32', null, '东南', 'D', '1', '14', '11', null);
INSERT INTO `brand` VALUES ('33', null, '东风风神', 'D', '1', '15', '11', null);
INSERT INTO `brand` VALUES ('34', null, 'DS', 'D', '1', '16', '11', null);
INSERT INTO `brand` VALUES ('35', '2017/06/13/4jvtx0xawp39lr6d1jpp.png', '丰田', 'F', '1', '17', '11', null);
INSERT INTO `brand` VALUES ('36', '2017/06/13/449qm0s99q568xwvxa33.png', '福特', 'F', '1', '18', '11', null);
INSERT INTO `brand` VALUES ('37', null, '菲亚特', 'F', '1', '19', '11', null);
INSERT INTO `brand` VALUES ('38', '2017/07/14/794579one8xt023e7c7b.png', '广州传祺', 'G', '1', '20', '11', null);
INSERT INTO `brand` VALUES ('39', '2017/07/14/hcic4lc6i255m2bisy66.png', '哈弗', 'H', '1', '21', '11', null);
INSERT INTO `brand` VALUES ('40', null, '江淮', 'I', '2', '22', '11', null);
INSERT INTO `brand` VALUES ('41', null, 'Jeep', 'J', '2', '23', '11', null);
INSERT INTO `brand` VALUES ('42', null, '金杯', 'J', '2', '24', '11', null);
INSERT INTO `brand` VALUES ('43', null, '捷豹', 'J', '2', '25', '11', null);
INSERT INTO `brand` VALUES ('44', null, '凯迪拉克', 'K', '2', '26', '11', null);
INSERT INTO `brand` VALUES ('45', null, '铃木', 'L', '2', '27', '11', null);
INSERT INTO `brand` VALUES ('46', null, '路虎', 'L', '2', '28', '11', null);
INSERT INTO `brand` VALUES ('47', null, '雷克萨斯', 'L', '2', '29', '11', null);
INSERT INTO `brand` VALUES ('48', null, '力帆', 'L', '2', '30', '11', null);
INSERT INTO `brand` VALUES ('49', '2017/07/14/2fghs1xwg97g58skr721.png', '马自达', 'M', '2', '31', '11', null);
INSERT INTO `brand` VALUES ('50', null, 'MINI', 'M', '2', '32', '11', null);
INSERT INTO `brand` VALUES ('51', null, '纳智捷', 'N', '2', '33', '11', null);
INSERT INTO `brand` VALUES ('52', '2017/07/14/fgu2n1m3te9a196pk86j.png', '起亚', 'Q', '2', '34', '11', null);
INSERT INTO `brand` VALUES ('53', null, '奇瑞', 'Q', '2', '35', '11', null);
INSERT INTO `brand` VALUES ('54', null, '启辰', 'Q', '2', '36', '11', null);
INSERT INTO `brand` VALUES ('55', '2017/07/14/4s5f47xwt28121t1upp5.png', '日产', 'R', '2', '37', '11', null);
INSERT INTO `brand` VALUES ('56', null, '斯柯达', 'S', '3', '38', '11', null);
INSERT INTO `brand` VALUES ('57', '2017/07/14/uss1yv9t29o99om17j57.png', '三菱', 'S', '3', '39', '11', null);
INSERT INTO `brand` VALUES ('58', null, '斯巴鲁', 'S', '3', '40', '11', null);
INSERT INTO `brand` VALUES ('59', null, 'smart', 'S', '3', '41', '11', null);
INSERT INTO `brand` VALUES ('60', '2017/07/14/7w3eb0gp95z83zwzok7m.png', '五菱', 'W', '3', '42', '11', null);
INSERT INTO `brand` VALUES ('61', '2017/07/14/9f6409uwaj88h660gn17.png', '雪佛兰', 'X', '3', '43', '11', null);
INSERT INTO `brand` VALUES ('62', '2017/07/14/qo7902xpl1209jjpo8oa.png', '现代', 'X', '3', '44', '11', null);
INSERT INTO `brand` VALUES ('63', null, '野马', 'Y', '3', '45', '11', null);
INSERT INTO `brand` VALUES ('64', null, '众泰', 'Z', '3', '46', '11', null);
INSERT INTO `brand` VALUES ('65', '2017/07/14/16zs36iojvi5ykrtn4q0.png', '沃尔沃亚太', 'V', '3', '47', '11', null);
INSERT INTO `brand` VALUES ('66', '2017/07/14/89vmg00xk50623kl9f0w.png', '雷诺', 'L', '2', '48', '11', null);
INSERT INTO `brand` VALUES ('67', '2017/07/14/pum31300rs67jx228d55.png', '荣威', 'R', '2', '49', '11', null);

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) DEFAULT NULL,
  `guide_price` decimal(10,0) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `models_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `price_id` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `energ_id` int(11) DEFAULT NULL,
  `dis_id` int(11) DEFAULT NULL,
  `gearbox_id` int(11) DEFAULT NULL,
  `seats_id` int(11) DEFAULT NULL,
  `drive_id` int(11) DEFAULT NULL,
  `years_id` int(11) DEFAULT NULL,
  `del_id` int(11) DEFAULT NULL COMMENT '0 正常 1下架 2回收站',
  `look_times` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL COMMENT '0 未参加团购  1参加团购',
  `fadianji` varchar(255) DEFAULT NULL,
  `huanbaobiaozhun` varchar(255) DEFAULT NULL,
  `ranyou` varchar(255) DEFAULT NULL,
  `zonghegongkuangyouhao` varchar(255) DEFAULT NULL,
  `chemenshu` int(255) DEFAULT NULL,
  `zuoweishu` int(11) DEFAULT NULL,
  `cheshenxingshi` varchar(255) DEFAULT NULL,
  `changkuaigao` varchar(255) DEFAULT NULL,
  `zhouqu` int(255) DEFAULT NULL,
  `zhengtijuli` int(11) DEFAULT NULL,
  `youxiangyouji` int(255) DEFAULT NULL,
  `xinglixiangrongji` int(11) DEFAULT NULL,
  `baoxiuzhengce` varchar(255) DEFAULT NULL,
  `jinqixingshi` varchar(255) DEFAULT NULL,
  `zuidamali` int(11) DEFAULT NULL,
  `zuidagonglv` int(11) DEFAULT NULL,
  `zuidagonglvzhuansu` varchar(255) DEFAULT NULL,
  `zuidaniuli` int(11) DEFAULT NULL,
  `niujuzhuanshu` varchar(255) DEFAULT NULL,
  `gongyoufangshi` varchar(255) DEFAULT NULL,
  `qudongfangshi` varchar(255) DEFAULT NULL,
  `zhulileixing` varchar(255) DEFAULT NULL,
  `qianxuanguaxingshi` varchar(255) DEFAULT NULL,
  `houxuanguaxingshi` varchar(255) DEFAULT NULL,
  `qianzhidongguige` varchar(255) DEFAULT NULL,
  `houzhidongguige` varchar(255) DEFAULT NULL,
  `shoushaleixing` varchar(255) DEFAULT NULL,
  `qianluntguige` varchar(255) DEFAULT NULL,
  `houluntguige` varchar(255) DEFAULT NULL,
  `biansuxiangxingshi` varchar(255) DEFAULT NULL,
  `carmodel_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `content` text,
  `set_id` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `active_id` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `series_id` int(11) DEFAULT NULL,
  `real_price` decimal(10,2) DEFAULT NULL,
  `sel_price` decimal(10,2) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `tejiache` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL COMMENT '其它类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('1', '11', '60', '99', '华成宝马', '2017/07/22/arwk59fx41r6q103pt13.jpg', '2', '1', '22', '1', '1', '1', '1', '1', '1', '1', '1', '2', '0', null, '0', 'L型/135kW', '国4', '汽油95号', '6.9L/100km', '4', '5', '三厢', '三厢', '3108', '1740', '70', '520', '三年或10万公里', '增压', '184', '135', '5000-6250', '270', '1250-4500', '直喷', '后轮驱动', '电子', null, null, null, null, null, null, null, null, '1', '1', '<ul class=\"index-reason list-paddingleft-2\"><li><p><em class=\"icons\"></em></p><p>郑重承诺：所售车源均是4S店正规车源，享受全国联保服务！</p></li><li><p><em class=\"icon\"></em></p><h3>多家比价</h3><p>预付订金后多家4S店会实时报底价，<br/>挑选满意报价生成底价凭证。</p></li><li><p><em class=\"icon\"></em></p><h3>底价承诺</h3><p>在报价有效期内到店买车，承诺成交价不高于底价凭证上的价格。</p></li><li><p><em class=\"icon\"></em></p><h3>专属买车顾问</h3><p>提供一对一的专属买车顾问服务，<br/>为您解决买车的后顾之忧。</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>省时省力，快速获得各个4S店的底价</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>不用砍价，直接获取真实的底价</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>底价承诺，确保成交价不高于底价凭证</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>惠买车认证4S店靠谱可信</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>预付订金到惠买车，不买车订金随时退</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>24小时专属服务顾问，为您答疑</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>需要到多家4S店咨询，花时间又累人</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>需要到店反复砍价，费劲口舌</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>会被忽悠，可能会被宰</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>有可能会碰到黑心经销商</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>不买车，退还订金不方便</p></li></ul><ul class=\" list-paddingleft-2\"><li><p><br/></p></li><li><p>无专业人员答疑解惑，全靠自己摸索</p></li></ul><ul class=\"payment-reason list-paddingleft-2\"><li><p><em class=\"icons\"></em></p></li><li><p>惠买车向用户承诺</p></li><li><p>用户按平台买车流程获取报价并在底价凭证有效期内完成买车，<br/>若车款成交价格不是买车4S店该车款的底价，<br/>用户可凭相关购车发票及相关证据材料获得5000元补偿金。<br/>（具体赔偿细节见<a target=\"_blank\" href=\"http://help.#/issue/servicecontract/\">服务协议</a>）</p></li></ul><h3 class=\"fq-title\">常见问题</h3><ul class=\" list-paddingleft-2\"><li><p>Q<em>1</em>为什么要预付订金？</p></li><li><p>预付订金后，经销商才会认为您是一个买车意愿非常强烈的客户，<br/>才愿意去和其他商家竞争报出更低的真实成交价。</p></li></ul><ul class=\" list-paddingleft-2\"><li><p>Q<em>2</em>是在4S店提车吗？</p></li><li><p>YES! 是的。选车、看车、提车、验车全程都在4S店进行，<br/>也同样享受全国联保以及厂家质保服务。</p></li></ul><ul class=\" list-paddingleft-2\"><li><p>Q<em>3</em>不买车的话，订金可以退吗？</p></li><li><p>YES! 用户在交易过程中付款买车前，可随时终止交易，惠买车将即时<br/>退还用户支付的订金和优惠券，包括但不限于：对商家报价不满意、选<br/>择商家后反悔、到店看车试驾不满意。</p></li></ul>', '3,1,4,', null, '2017-07-22 16:31:09', '1', '   车集市平均节省7.71万', '1', '31.00', '29.00', null, '1', '1', null);
INSERT INTO `car` VALUES ('2', '11', '69', '99', '华成宝马', '2017/07/22/d53157jb54jn85f0e88f.jpg', '1', '1', '22', '1', '2', '4', '1', '1', '1', '1', '1', '2', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '18', '1', null, '3,1,4,', null, '2017-07-22 16:34:48', '0', '   车集市平均节省7.71万', '6', null, '1.00', null, null, '1', null);
INSERT INTO `car` VALUES ('3', '11', '1', '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('4', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('5', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '3', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '2', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('6', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '4', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '2', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('7', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '2', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('8', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '2', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('9', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '7', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '2', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('10', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('11', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('12', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('13', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('14', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('15', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('16', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('17', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('18', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('19', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('20', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, '1', '1', null);
INSERT INTO `car` VALUES ('21', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('22', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', '2', '1', '19', '1', '2', '4', '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('23', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('24', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('25', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('26', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('27', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('28', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('29', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('30', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('31', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,9,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('32', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, '2017-06-08 17:11:53', null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('33', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('34', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', '<p>dsd<br/></p>', '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('35', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('36', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('37', '11', null, '99', '饿死', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', '1', null, '3,1,4,', null, null, null, '   车集市平均节省7.71万', '1', null, null, null, null, '1', null);
INSERT INTO `car` VALUES ('38', '11', '43', '99', '奥迪', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', '1', '<p>test<br/></p>', '3,1,4,', null, '2017-09-20 23:28:02', '0', '   车集市平均节省7.71万', '3', '38.00', '5.00', null, null, '1', null);
INSERT INTO `car` VALUES ('39', '11', null, '99', '一汽-大众', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '14', '1', '<p>s&#39;s<br/></p>', '3,1,4,', null, '2017-07-04 12:05:15', '0', '   车集市平均节省7.71万', '4', '54.00', '3.00', null, null, '1', null);
INSERT INTO `car` VALUES ('40', '11', null, '99', '一汽大众', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '13', '1', '<p>杀杀杀111<br/></p>', '3,1,8,', '2017-06-07 16:45:07', '2017-07-04 12:00:40', '0', '   车集市平均节省7.71万', '3', '23.00', '1.00', null, null, '1', null);
INSERT INTO `car` VALUES ('41', '11', null, '99', '一汽大众', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '12', '1', '<p>ss<br/></p>', '3,1,4,', '2017-06-08 16:45:07', '2017-07-04 12:37:58', '1', '   车集市平均节省7.71万', '3', '43.00', '1.00', null, null, '1', null);
INSERT INTO `car` VALUES ('42', '11', null, '99', '一汽大众', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', '1', null, '11', '1', '1', '1', '2', '1', '1', '0', null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '11', '1', '<p>测试文字<br/></p>', '1,2,3,', '2017-06-11 18:30:25', '2017-07-04 09:22:41', '1', '   车集市平均节省7.71万', '3', '41.00', '7.00', null, null, '1', null);
INSERT INTO `car` VALUES ('43', '11', '48', null, 'dsad', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', null, null, null, '1', '1', '1', '1', '1', '2', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '11', '1', '<p><img src=\"/img/u/2017/07/05/d49s01lb0fi913r8nzn1.jpg\" style=\"\" title=\"2017/07/05/d49s01lb0fi913r8nzn1.jpg\"/></p><p><img src=\"/img/u/2017/07/05/kv0tkfptl8xnw2b92kb6.jpg\" style=\"\" title=\"2017/07/05/kv0tkfptl8xnw2b92kb6.jpg\"/></p><p><img src=\"/img/u/2017/07/05/v9b2xalfp0z3309g5f6b.jpg\" style=\"\" title=\"2017/07/05/v9b2xalfp0z3309g5f6b.jpg\"/></p><p><img src=\"/img/u/2017/07/05/k55j716cc7k1jy4ap3al.jpg\" style=\"\" title=\"2017/07/05/k55j716cc7k1jy4ap3al.jpg\"/></p><p><img src=\"/img/u/2017/07/05/56v922hb0204k2yt89nx.jpg\" style=\"\" title=\"2017/07/05/56v922hb0204k2yt89nx.jpg\"/></p><p><img src=\"/img/u/2017/07/05/x40lubkl009tb51018fi.jpg\" style=\"\" title=\"2017/07/05/x40lubkl009tb51018fi.jpg\"/></p><p><img src=\"/img/u/2017/07/05/67mn74w780c6197m2a7k.jpg\" style=\"\" title=\"2017/07/05/67mn74w780c6197m2a7k.jpg\"/></p><p><br/></p>', null, '2017-07-05 14:59:15', null, '0', null, '3', '45.00', '3.00', null, null, '1', null);
INSERT INTO `car` VALUES ('44', '11', '47', null, 'dasd', '2017/06/09/ol8wg72f7wzj127e1v11.jpg', null, '1', '19', null, null, null, '1', '1', '1', '1', '1', '2', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '11', '1', '<p>dasd</p><p><img src=\"/img/u/2017/07/05/epitjx7uuc88jby52lby.jpg\" style=\"\" title=\"2017/07/05/epitjx7uuc88jby52lby.jpg\"/></p><p><img src=\"/img/u/2017/07/05/3lg0d636x5t1kn958hoa.jpg\" style=\"\" title=\"2017/07/05/3lg0d636x5t1kn958hoa.jpg\"/></p><p><img src=\"/img/u/2017/07/05/21l73ym1lld99u25fdo0.jpg\" style=\"\" title=\"2017/07/05/21l73ym1lld99u25fdo0.jpg\"/></p><p><img src=\"/img/u/2017/07/05/uzk03c77iq66twb3nsye.jpg\" style=\"\" title=\"2017/07/05/uzk03c77iq66twb3nsye.jpg\"/></p><p><br/></p>', null, '2017-07-05 15:02:07', null, '0', null, '3', '34.00', '13.00', null, null, '1', null);
INSERT INTO `car` VALUES ('45', '11', '43', null, 'edsadasd', '2017/08/09/0x231x653lb83uoia083.jpg', null, '2', '19', null, null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '11', '1', '<p>dasdasdasd</p>', '1,2,', '2017-08-09 18:01:47', null, '0', null, '3', '32.00', '11.00', null, null, null, null);
INSERT INTO `car` VALUES ('46', '11', '54', null, 'fdfasdfasdsadasd', '2017/08/11/s365v9531704299m92e5.jpg', null, '1', '22', null, null, null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '21', '1', '<p>dsadasdasdasdas</p>', '4,5,6,', '2017-08-11 19:54:30', '2017-08-11 19:59:42', '1', null, '6', '43.00', '11.00', null, null, '1', null);
INSERT INTO `car` VALUES ('47', '11', '43', null, '4444444444444444444444444444444444444', '2017/09/06/fv466i46058348o6m4k5.jpg', null, '1', '19', null, null, null, '1', '1', '1', '1', '1', '2', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '15', '1', '<p>dsdasdddddddddddd</p><p><img src=\"/img/u/2017/07/04/r7le61jzy0v93bxsxms5.jpg\" style=\"\"/></p><p><img src=\"/img/u/2017/07/04/86i95dq9141203261876.jpg\" style=\"\"/></p><p><br/></p>', '1,2,3,4,', '2017-09-06 21:56:30', null, '0', null, '4', '32.00', '11.00', null, null, '1', null);
INSERT INTO `car` VALUES ('48', '11', '20', null, '福克斯', null, null, '1', '36', null, '1', null, '1', '1', '1', '1', '1', '1', '0', null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '1', null, null, '2017-09-20 23:25:20', null, '0', null, null, '15.00', '5.00', null, null, '1', null);

-- ----------------------------
-- Table structure for carhot
-- ----------------------------
DROP TABLE IF EXISTS `carhot`;
CREATE TABLE `carhot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `times` int(11) DEFAULT NULL,
  `begin` varchar(255) DEFAULT NULL,
  `end` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carhot
-- ----------------------------
INSERT INTO `carhot` VALUES ('1', '1', null, '1', null, null);
INSERT INTO `carhot` VALUES ('2', '2', null, '1', null, null);
INSERT INTO `carhot` VALUES ('3', '3', null, '1', null, null);
INSERT INTO `carhot` VALUES ('4', '4', null, '1', null, null);
INSERT INTO `carhot` VALUES ('5', '5', null, '1', null, null);
INSERT INTO `carhot` VALUES ('6', '6', null, '1', null, null);

-- ----------------------------
-- Table structure for carmodels
-- ----------------------------
DROP TABLE IF EXISTS `carmodels`;
CREATE TABLE `carmodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `series_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carmodels
-- ----------------------------
INSERT INTO `carmodels` VALUES ('1', '320i M运动型', '2');
INSERT INTO `carmodels` VALUES ('2', '320Li 时尚型', '2');
INSERT INTO `carmodels` VALUES ('3', '320Li M运动型', '2');
INSERT INTO `carmodels` VALUES ('4', '320Li xDrive 时尚型', '2');
INSERT INTO `carmodels` VALUES ('5', '320Li 豪华设计套装', '2');
INSERT INTO `carmodels` VALUES ('6', '518i 时尚型', '1');
INSERT INTO `carmodels` VALUES ('7', '518Li 时尚型', '1');
INSERT INTO `carmodels` VALUES ('8', '530Li M运动型', '1');
INSERT INTO `carmodels` VALUES ('9', '530Li xDrive 豪华设计套装', '1');
INSERT INTO `carmodels` VALUES ('10', '530i M运动', '1');
INSERT INTO `carmodels` VALUES ('11', 'TFSI 技术型', '3');
INSERT INTO `carmodels` VALUES ('12', 'TFSI 舒适型', '3');
INSERT INTO `carmodels` VALUES ('13', 'TFSI 运动型', '3');
INSERT INTO `carmodels` VALUES ('14', '40 TFSI 进取型', '4');
INSERT INTO `carmodels` VALUES ('15', '40 TFSI 时尚型 Plus', '4');
INSERT INTO `carmodels` VALUES ('16', '40 TFSI 时尚型', '4');
INSERT INTO `carmodels` VALUES ('17', '320i M运动型', '6');
INSERT INTO `carmodels` VALUES ('18', '320Li 时尚型', '6');
INSERT INTO `carmodels` VALUES ('19', '320Li M运动型', '6');
INSERT INTO `carmodels` VALUES ('20', '320Li xDrive 时尚型', '6');
INSERT INTO `carmodels` VALUES ('21', '320Li 豪华设计套装', '6');

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('1', '安徽', null);
INSERT INTO `city` VALUES ('2', '北京', null);
INSERT INTO `city` VALUES ('3', '福建', null);
INSERT INTO `city` VALUES ('4', '甘肃', null);
INSERT INTO `city` VALUES ('5', '广东', null);
INSERT INTO `city` VALUES ('6', '广西', null);
INSERT INTO `city` VALUES ('7', '贵州', null);
INSERT INTO `city` VALUES ('8', '海南', null);
INSERT INTO `city` VALUES ('9', '河北', null);
INSERT INTO `city` VALUES ('10', '河南', null);
INSERT INTO `city` VALUES ('11', '黑龙江', null);
INSERT INTO `city` VALUES ('12', '湖北', null);
INSERT INTO `city` VALUES ('13', '湖南', null);
INSERT INTO `city` VALUES ('14', '吉林', null);
INSERT INTO `city` VALUES ('15', '江苏', null);
INSERT INTO `city` VALUES ('16', '江西', null);
INSERT INTO `city` VALUES ('17', '辽宁', null);
INSERT INTO `city` VALUES ('18', '内蒙古', null);
INSERT INTO `city` VALUES ('19', '宁夏', null);
INSERT INTO `city` VALUES ('20', '青海', null);
INSERT INTO `city` VALUES ('21', '山东', null);
INSERT INTO `city` VALUES ('22', '山西', null);
INSERT INTO `city` VALUES ('23', '陕西', null);
INSERT INTO `city` VALUES ('24', '上海', null);
INSERT INTO `city` VALUES ('25', '四川', null);
INSERT INTO `city` VALUES ('26', '天津', null);
INSERT INTO `city` VALUES ('27', '西藏', null);
INSERT INTO `city` VALUES ('28', '云南', null);
INSERT INTO `city` VALUES ('29', '浙江', null);
INSERT INTO `city` VALUES ('30', '重庆', null);
INSERT INTO `city` VALUES ('31', '合肥', '1');
INSERT INTO `city` VALUES ('32', '北京', '2');
INSERT INTO `city` VALUES ('33', '福州', '3');
INSERT INTO `city` VALUES ('34', '瑶海区', '31');
INSERT INTO `city` VALUES ('35', '安庆', '1');
INSERT INTO `city` VALUES ('36', '大观区', '35');
INSERT INTO `city` VALUES ('37', '广州', '5');
INSERT INTO `city` VALUES ('38', '天河区', '37');
INSERT INTO `city` VALUES ('39', '白云区', '37');
INSERT INTO `city` VALUES ('40', '深圳', '5');

-- ----------------------------
-- Table structure for color
-- ----------------------------
DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of color
-- ----------------------------
INSERT INTO `color` VALUES ('1', '\r\n琥珀橙', '#a35206');
INSERT INTO `color` VALUES ('2', '拉力红', '#9c0701');
INSERT INTO `color` VALUES ('3', '珍珠白', '#f5f5e9');
INSERT INTO `color` VALUES ('4', '炫动蓝', '#13366b');
INSERT INTO `color` VALUES ('5', '彩晶黑', '#0a0a0a');
INSERT INTO `color` VALUES ('6', '暗金蓝', '#08283b');
INSERT INTO `color` VALUES ('7', '圣银灰', '#6e6c6e');

-- ----------------------------
-- Table structure for column
-- ----------------------------
DROP TABLE IF EXISTS `column`;
CREATE TABLE `column` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `headDisplay` varchar(255) DEFAULT NULL COMMENT '1展示，null 不展示 。是否在头部显示，其余则全部显示在末尾。',
  `agreement` varchar(255) DEFAULT NULL COMMENT '是在显示在登陆窗口的用户注意协议，默认为null ，为1就是展示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of column
-- ----------------------------
INSERT INTO `column` VALUES ('1', '买车指南', null, '1', null);
INSERT INTO `column` VALUES ('2', '买车服务', null, null, null);
INSERT INTO `column` VALUES ('3', '商务合作', null, null, null);
INSERT INTO `column` VALUES ('4', '关于我们', null, null, null);
INSERT INTO `column` VALUES ('5', '底价买车', '1', null, null);
INSERT INTO `column` VALUES ('6', '团购买车', '1', null, null);
INSERT INTO `column` VALUES ('7', '提车相关', '1', null, null);
INSERT INTO `column` VALUES ('8', '买车顾问', '2', '1', null);
INSERT INTO `column` VALUES ('9', '支付相关', '2', null, null);
INSERT INTO `column` VALUES ('10', '买车礼品', '2', null, null);
INSERT INTO `column` VALUES ('11', '入驻须知', '3', null, null);
INSERT INTO `column` VALUES ('12', '合作优势', '3', null, null);
INSERT INTO `column` VALUES ('13', '合作媒体', '3', null, null);
INSERT INTO `column` VALUES ('14', '平台介绍', '4', null, null);
INSERT INTO `column` VALUES ('15', '联系我们', '4', null, null);
INSERT INTO `column` VALUES ('16', '服务协议', '4', null, null);

-- ----------------------------
-- Table structure for contentimg
-- ----------------------------
DROP TABLE IF EXISTS `contentimg`;
CREATE TABLE `contentimg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contentimg
-- ----------------------------
INSERT INTO `contentimg` VALUES ('1', '40', '2017/07/04/r7le61jzy0v93bxsxms5.jpg', null);
INSERT INTO `contentimg` VALUES ('2', '40', '2017/07/04/emuj3a7xhzlss270wsj5.jpg', null);
INSERT INTO `contentimg` VALUES ('3', '40', '2017/07/04/46c7u0m9k36d0w4rkj4r.jpg', null);
INSERT INTO `contentimg` VALUES ('4', '40', '2017/07/04/0okxzq35e5o0f4702069.jpg', null);
INSERT INTO `contentimg` VALUES ('5', '40', '2017/07/04/86i95dq9141203261876.jpg', null);
INSERT INTO `contentimg` VALUES ('6', '40', '2017/07/04/l1tt1v5xt0499oqv6syg.jpg', null);
INSERT INTO `contentimg` VALUES ('7', '40', '2017/07/04/bc680l75t9920s1163jt.jpg', null);
INSERT INTO `contentimg` VALUES ('8', '40', '2017/07/04/2015s56gzg0o4cns0yv4.jpg', null);
INSERT INTO `contentimg` VALUES ('9', '40', '2017/07/04/v85psm1xkor66lwcfw3z.jpg', null);
INSERT INTO `contentimg` VALUES ('10', '40', '2017/07/04/dzn64u0dos9fz52dh8oc.jpg', null);
INSERT INTO `contentimg` VALUES ('11', '40', '2017/07/04/0mjkyt4893f080q48d1y.jpg', null);
INSERT INTO `contentimg` VALUES ('12', '40', '2017/07/04/i45d830r24vjj2rl92bp.jpg', null);
INSERT INTO `contentimg` VALUES ('13', '40', '2017/07/04/m62w41qq9f96zwz23a70.jpg', null);
INSERT INTO `contentimg` VALUES ('14', '40', '2017/07/04/i45d830r24vjj2rl92bp.jpg', null);
INSERT INTO `contentimg` VALUES ('15', '40', '2017/07/04/m62w41qq9f96zwz23a70.jpg', null);
INSERT INTO `contentimg` VALUES ('16', '40', '2017/07/04/aousp1q093lgvu20zohg.jpg', null);
INSERT INTO `contentimg` VALUES ('17', '40', '2017/07/04/291py80oy7ht0po16dwk.jpg', null);
INSERT INTO `contentimg` VALUES ('18', '40', '2017/07/04/w5z53tf1oc9lqc57r72x.jpg', null);
INSERT INTO `contentimg` VALUES ('19', '40', '2017/07/04/9b0u6yt9t206227f395t.jpg', null);
INSERT INTO `contentimg` VALUES ('20', '40', '2017/07/04/ofi05ytz2eu6q2ck0w54.jpg', null);
INSERT INTO `contentimg` VALUES ('21', '40', '2017/07/04/5a9zea2jg9v5jyon4bye.jpg', null);
INSERT INTO `contentimg` VALUES ('22', '40', '2017/07/04/x0z9vf3yw2jxpoi073n1.jpg', null);
INSERT INTO `contentimg` VALUES ('23', '40', '2017/07/04/02tnhv7f894wm2a18fd5.jpg', null);
INSERT INTO `contentimg` VALUES ('24', '40', '2017/07/04/0mjkyt4893f080q48d1y.jpg', null);
INSERT INTO `contentimg` VALUES ('25', '40', '2017/07/04/i45d830r24vjj2rl92bp.jpg', null);
INSERT INTO `contentimg` VALUES ('26', '46', '2017/08/11/t729j84a12p7is8d0gt0.jpg', null);
INSERT INTO `contentimg` VALUES ('27', '46', '2017/08/11/pjg9uvx77bnj597i8rhn.jpg', null);
INSERT INTO `contentimg` VALUES ('28', '46', '2017/08/11/a2me05e1y9tb88n418f0.jpg', null);
INSERT INTO `contentimg` VALUES ('29', '46', '2017/08/11/5x4z3414426vjmni11d0.jpg', null);
INSERT INTO `contentimg` VALUES ('30', '46', '2017/08/11/295h93e281nl5x3z78ru.jpg', null);
INSERT INTO `contentimg` VALUES ('31', '46', '2017/08/11/h2b401qox1q5522e44tn.jpg', null);
INSERT INTO `contentimg` VALUES ('32', '46', '2017/08/11/r5y42hp273zi4je4ml6n.jpg', null);
INSERT INTO `contentimg` VALUES ('33', '46', '2017/08/11/y659t33vsyqpplsb0243.jpg', null);
INSERT INTO `contentimg` VALUES ('34', '46', '2017/08/11/c1w930423y9w1l8nl6pr.jpg', null);
INSERT INTO `contentimg` VALUES ('35', '46', '2017/08/11/j9mxr38y6bmxv0p90568.jpg', null);
INSERT INTO `contentimg` VALUES ('36', '46', '2017/08/11/n8k8rmm85wxnt936t876.jpg', null);
INSERT INTO `contentimg` VALUES ('37', '46', '2017/08/11/pdma38rr0vo15c67wndo.jpg', null);
INSERT INTO `contentimg` VALUES ('38', '46', '2017/08/11/f5ujhrhl97646624i154.jpg', null);
INSERT INTO `contentimg` VALUES ('39', '46', '2017/08/11/ab8vr8h62n14v0507xx0.jpg', null);
INSERT INTO `contentimg` VALUES ('40', '46', '2017/08/11/1y707t5373h14svm2p1h.jpg', null);
INSERT INTO `contentimg` VALUES ('41', '46', '2017/08/11/cymrwn71r5it62zq2fp4.jpg', null);
INSERT INTO `contentimg` VALUES ('42', '46', '2017/08/11/afjuj9z421kdx9268rw9.jpg', null);
INSERT INTO `contentimg` VALUES ('43', '46', '2017/08/11/n4c29b115147ax1w3h6w.jpg', null);
INSERT INTO `contentimg` VALUES ('44', '46', '2017/08/11/f2a0lq07hrmv34fr9auq.jpg', null);
INSERT INTO `contentimg` VALUES ('45', '46', '2017/08/11/wyp4273b5s1j89fxzaw8.jpg', null);
INSERT INTO `contentimg` VALUES ('46', '46', '2017/08/11/r34oj7f1677ys9lj54b9.jpg', null);
INSERT INTO `contentimg` VALUES ('47', '46', '2017/08/11/197k014pqep9qgw252wc.jpg', null);
INSERT INTO `contentimg` VALUES ('48', '46', '2017/08/11/9br79a6fzvf79sdld358.jpg', null);
INSERT INTO `contentimg` VALUES ('49', '46', '2017/08/11/zh736jx86ydx4t08k11e.jpg', null);
INSERT INTO `contentimg` VALUES ('50', '46', '2017/08/11/my5r83pk76k778f52j92.jpg', null);
INSERT INTO `contentimg` VALUES ('51', '46', '2017/08/11/o47la7r6ka99e57wxlqb.jpg', null);
INSERT INTO `contentimg` VALUES ('52', '47', '2017/09/06/gaay2jip2dfr29fuv735.jpg', null);
INSERT INTO `contentimg` VALUES ('53', '47', '2017/09/06/6t0no4ub6sw13mjr5tb2.jpg', null);
INSERT INTO `contentimg` VALUES ('54', '47', '2017/09/06/hu6aa73e8ox663o05zkb.jpg', null);

-- ----------------------------
-- Table structure for contract
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` text COMMENT '内容',
  `picture_url` varchar(255) DEFAULT NULL COMMENT '图片地址',
  `share_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '分享日期',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `car_id` int(11) NOT NULL COMMENT '汽车ID',
  `review_id` int(11) DEFAULT '1' COMMENT '审核状态（0：未通过；1：已通过）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contract
-- ----------------------------

-- ----------------------------
-- Table structure for contract_images
-- ----------------------------
DROP TABLE IF EXISTS `contract_images`;
CREATE TABLE `contract_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `picture_url` varchar(255) DEFAULT NULL COMMENT '图片地址',
  `contract_id` int(11) NOT NULL COMMENT '合同ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contract_images
-- ----------------------------

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of country
-- ----------------------------
INSERT INTO `country` VALUES ('1', '国产');
INSERT INTO `country` VALUES ('2', '日韩系');
INSERT INTO `country` VALUES ('3', '美系');
INSERT INTO `country` VALUES ('4', '欧系');
INSERT INTO `country` VALUES ('5', '非日系');

-- ----------------------------
-- Table structure for displacement
-- ----------------------------
DROP TABLE IF EXISTS `displacement`;
CREATE TABLE `displacement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of displacement
-- ----------------------------
INSERT INTO `displacement` VALUES ('1', '1.3L以下');
INSERT INTO `displacement` VALUES ('2', '1.3-1.6L');
INSERT INTO `displacement` VALUES ('3', '1.7-2.0L');
INSERT INTO `displacement` VALUES ('4', '2.1-3.0L');
INSERT INTO `displacement` VALUES ('5', '3.0L以上');

-- ----------------------------
-- Table structure for drive
-- ----------------------------
DROP TABLE IF EXISTS `drive`;
CREATE TABLE `drive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of drive
-- ----------------------------
INSERT INTO `drive` VALUES ('1', '前驱');
INSERT INTO `drive` VALUES ('2', '后驱');
INSERT INTO `drive` VALUES ('3', '四驱');

-- ----------------------------
-- Table structure for energy
-- ----------------------------
DROP TABLE IF EXISTS `energy`;
CREATE TABLE `energy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of energy
-- ----------------------------
INSERT INTO `energy` VALUES ('1', '汽油');
INSERT INTO `energy` VALUES ('2', '柴油');
INSERT INTO `energy` VALUES ('3', '纯电动');
INSERT INTO `energy` VALUES ('4', '油电混合');
INSERT INTO `energy` VALUES ('5', '油气混合');

-- ----------------------------
-- Table structure for gearbox
-- ----------------------------
DROP TABLE IF EXISTS `gearbox`;
CREATE TABLE `gearbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gearbox
-- ----------------------------
INSERT INTO `gearbox` VALUES ('1', '半自动');
INSERT INTO `gearbox` VALUES ('2', '自动');
INSERT INTO `gearbox` VALUES ('3', '手自一体');
INSERT INTO `gearbox` VALUES ('4', '无极变速');
INSERT INTO `gearbox` VALUES ('5', '双离合');
INSERT INTO `gearbox` VALUES ('6', '手动挡');

-- ----------------------------
-- Table structure for img
-- ----------------------------
DROP TABLE IF EXISTS `img`;
CREATE TABLE `img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  `flag_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of img
-- ----------------------------
INSERT INTO `img` VALUES ('93', '2017/07/04/r7le61jzy0v93bxsxms5.jpg', '42', null, null);
INSERT INTO `img` VALUES ('94', '2017/07/04/emuj3a7xhzlss270wsj5.jpg', '42', null, null);
INSERT INTO `img` VALUES ('95', '2017/07/04/46c7u0m9k36d0w4rkj4r.jpg', '42', null, null);
INSERT INTO `img` VALUES ('96', '2017/07/04/0okxzq35e5o0f4702069.jpg', '42', null, null);
INSERT INTO `img` VALUES ('97', '2017/07/04/86i95dq9141203261876.jpg', '42', null, null);
INSERT INTO `img` VALUES ('98', '2017/07/04/l1tt1v5xt0499oqv6syg.jpg', '42', null, null);
INSERT INTO `img` VALUES ('99', '2017/07/04/bc680l75t9920s1163jt.jpg', '42', null, null);
INSERT INTO `img` VALUES ('129', '2017/07/04/2015s56gzg0o4cns0yv4.jpg', '40', null, null);
INSERT INTO `img` VALUES ('130', '2017/07/04/v85psm1xkor66lwcfw3z.jpg', '40', null, null);
INSERT INTO `img` VALUES ('131', '2017/07/04/dzn64u0dos9fz52dh8oc.jpg', '40', null, null);
INSERT INTO `img` VALUES ('132', '2017/07/04/0mjkyt4893f080q48d1y.jpg', '40', null, null);
INSERT INTO `img` VALUES ('133', '2017/07/04/i45d830r24vjj2rl92bp.jpg', '40', null, null);
INSERT INTO `img` VALUES ('134', '2017/07/04/m62w41qq9f96zwz23a70.jpg', '40', null, null);
INSERT INTO `img` VALUES ('135', '2017/07/04/aousp1q093lgvu20zohg.jpg', '40', null, null);
INSERT INTO `img` VALUES ('136', '2017/07/04/291py80oy7ht0po16dwk.jpg', '39', null, null);
INSERT INTO `img` VALUES ('137', '2017/07/04/w5z53tf1oc9lqc57r72x.jpg', '39', null, null);
INSERT INTO `img` VALUES ('138', '2017/07/04/9b0u6yt9t206227f395t.jpg', '39', null, null);
INSERT INTO `img` VALUES ('139', '2017/07/04/ofi05ytz2eu6q2ck0w54.jpg', '39', null, null);
INSERT INTO `img` VALUES ('140', '2017/07/04/5a9zea2jg9v5jyon4bye.jpg', '39', null, null);
INSERT INTO `img` VALUES ('141', '2017/07/04/x0z9vf3yw2jxpoi073n1.jpg', '39', null, null);
INSERT INTO `img` VALUES ('142', '2017/07/04/02tnhv7f894wm2a18fd5.jpg', '39', null, null);
INSERT INTO `img` VALUES ('150', '2017/07/05/q97rt372jf8zu4qn61n1.jpg', '44', null, null);
INSERT INTO `img` VALUES ('151', '2017/07/05/nsp14e6s2j3grqjwusk9.jpg', '44', null, null);
INSERT INTO `img` VALUES ('152', '2017/07/05/8kkq1s88789d6103k0w9.jpg', '44', null, null);
INSERT INTO `img` VALUES ('153', '2017/07/05/03ox344nvbmdm6a0cyu5.jpg', '44', null, null);
INSERT INTO `img` VALUES ('159', '2017/07/22/67z8d3l9y7o23gzl8321.jpg', '1', null, null);
INSERT INTO `img` VALUES ('160', '2017/07/22/d9mcb6kz42vf134p47u7.jpg', '1', null, null);
INSERT INTO `img` VALUES ('161', '2017/07/22/o6hwqgvw9293122k9diu.jpg', '1', null, null);
INSERT INTO `img` VALUES ('162', '2017/07/22/q7q3yvic96t970ju6k33.jpg', '1', null, null);
INSERT INTO `img` VALUES ('163', '2017/07/22/nq6j96bb7foe68jaul1e.jpg', '1', null, null);
INSERT INTO `img` VALUES ('164', '2017/07/22/r9vh55il8ss30j7m15y3.jpg', '2', null, null);
INSERT INTO `img` VALUES ('165', '2017/07/22/l2j866vhzs5h730cz1z1.jpg', '2', null, null);
INSERT INTO `img` VALUES ('166', '2017/07/22/14f98qa4r103bo0w3s2d.jpg', '2', null, null);
INSERT INTO `img` VALUES ('167', '2017/07/22/8s768882nhrn3abm4f82.jpg', '2', null, null);
INSERT INTO `img` VALUES ('168', '2017/07/22/k4yy9ufu7e1180n5ox41.jpg', '2', null, null);
INSERT INTO `img` VALUES ('169', '2017/08/09/rhb22997p7142zugd1y8.jpg', '45', null, null);
INSERT INTO `img` VALUES ('170', '2017/08/09/w55iyi68d9265fnk97a8.jpg', '45', null, null);
INSERT INTO `img` VALUES ('171', '2017/08/09/u1avep1200rb398zf2m5.jpg', '45', null, null);
INSERT INTO `img` VALUES ('172', '2017/08/09/l9xw5rjf49kfa1zdn2r4.jpg', '45', null, null);
INSERT INTO `img` VALUES ('173', '2017/08/09/2a2899m2756d09s6x32u.jpg', '45', null, null);
INSERT INTO `img` VALUES ('174', '2017/08/09/qa303n1h21i3o6111uaa.jpg', '45', null, null);
INSERT INTO `img` VALUES ('180', '2017/08/11/q01llvfo88t5uakoj025.jpg', '46', null, null);
INSERT INTO `img` VALUES ('181', '2017/08/11/071g86adehqj8v879cwc.jpg', '46', null, null);
INSERT INTO `img` VALUES ('182', '2017/08/11/1oyh208u002930bl619r.jpg', '46', null, null);
INSERT INTO `img` VALUES ('183', '2017/08/11/29580civ768045b8cmw7.jpg', '46', null, null);
INSERT INTO `img` VALUES ('184', '2017/09/06/ux0276b215824912cfix.jpg', '47', null, null);
INSERT INTO `img` VALUES ('185', '2017/09/06/it72i6kpu3to701y79i0.jpg', '47', null, null);
INSERT INTO `img` VALUES ('186', '2017/09/06/9xe819c0rs520vp7v4x1.jpg', '47', null, null);

-- ----------------------------
-- Table structure for insure
-- ----------------------------
DROP TABLE IF EXISTS `insure`;
CREATE TABLE `insure` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) DEFAULT NULL COMMENT '公司名称',
  `picture_url` varchar(255) DEFAULT NULL COMMENT '图片地址',
  `access_path` text COMMENT '访问路径',
  `introduction` text COMMENT '公司简介',
  `del_id` int(11) DEFAULT '0' COMMENT '删除标记（0：正常；1：下架；2：删除）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of insure
-- ----------------------------

-- ----------------------------
-- Table structure for keymap
-- ----------------------------
DROP TABLE IF EXISTS `keymap`;
CREATE TABLE `keymap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `display` int(11) DEFAULT '0',
  `hot` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of keymap
-- ----------------------------
INSERT INTO `keymap` VALUES ('1', '品牌', '嘉实多（Castrol）', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('2', '品牌', '博世（BOSCH）', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('3', '品牌', '壳牌（Shell）', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('4', '品牌', '美孚（Mobil）', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('5', '分类', '机油', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('6', '类别', '正时皮带', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('7', '控制方式', '电子喇叭', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('8', '容量', '18L', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('9', '粘稠度', '15W-40', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('10', '颜色分类', '黑色', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('11', '形状', '蜗牛喇叭', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('12', '机油等级', 'CI-4', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('13', '套装类型', '正时皮带套装', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('14', '适配', '专车专用型', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('15', '减震种类', '油压式', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('16', '减震类型', '运动式（蓝桶）', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('17', '安装方位', '前减', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('18', '装车部位', '前挡风玻璃', null, '2017-09-10 23:14:31', '1', '0', null);
INSERT INTO `keymap` VALUES ('19', '玻璃特性', '镀膜玻璃', null, '2017-09-10 23:14:31', '1', '1', null);
INSERT INTO `keymap` VALUES ('20', '改装类型', '悬挂', null, '2017-09-10 23:14:31', '1', '1', null);
INSERT INTO `keymap` VALUES ('21', '分类', '车充点烟器', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('22', '品牌', '飞利浦（PHILIPS）', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('23', '系统', '安卓', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('24', '噪音', '70分贝以下', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('25', '类别', '全自动', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('26', '处理器', '双核', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('27', '线长', '无线', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('28', '使用范围', '车用', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('29', '屏幕类型', '电容屏', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('30', '分辨率', '1280*720', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('31', '机身内存', '8G', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('32', '运行内存', '1G', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('33', '使用场景', '车载', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('34', '滤网使用年限', '1年以内', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('35', '安装', '前录安装', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('36', '声道', '单声道', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('37', '屏幕尺寸', '10英寸以上', null, '2017-09-10 23:14:31', '2', '0', null);
INSERT INTO `keymap` VALUES ('38', '分类', '贴膜', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('39', '品牌', '3M', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('40', '转速', '1500转-3000转/分钟', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('41', '尺寸', '6寸', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('42', '类别', '汽车刷', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('43', '水箱容量', '自吸式', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('44', '规格', '全车膜', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('45', '充电', '12V充电电池', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('46', '水管长度', '11~20m', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('47', '电源方式', '交流电220v', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('48', '保持时间', '一年半以上', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('49', '硬度', '7h', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('50', '镀晶液结晶速度', '慢干型', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('51', ' 用途类别', '家用电压', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('52', ' 使用电源', '充电', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('53', ' 枪身材质', '塑料', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('54', '喷头水花类型', '雾状', null, '2017-09-10 23:14:31', '3', '0', null);
INSERT INTO `keymap` VALUES ('55', '分类', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('56', '品牌', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('57', '价格', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('58', '适用位置', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('59', '类别', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('60', '使用场景', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('61', '尺寸', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('62', ' 类型', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('63', '颜色', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('64', ' 安装方式', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('65', ' 季节', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('66', '适用季节', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('67', '用途', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('68', ' 材质', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('69', ' 车型', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('70', '操控', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('71', '功能', null, null, '2017-09-10 23:14:31', '4', '0', null);
INSERT INTO `keymap` VALUES ('72', '分类', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('73', '品牌', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('74', '噪音', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('75', '适用范围', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('76', '款式', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('77', '类型', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('78', '附加功能', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('79', '适用车型', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('80', '面料', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('81', '使用场景', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('82', '滤网使用年限', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('83', '功能', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('84', '重量', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('85', '容量', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('86', '国别', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('87', '特色', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('88', '材质', null, null, '2017-09-10 23:14:31', '5', '0', null);
INSERT INTO `keymap` VALUES ('89', '分类', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('90', '品牌', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('91', '价格', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('92', '功能', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('93', '类别', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('94', '车型', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('95', '区域', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('96', '驾照类型', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('97', '油品标号', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('98', '升数', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('99', '使用周期', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('100', '上车时间', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('101', '服务类别', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('102', '服务方式', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('103', '服务种类', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('104', '形态', null, null, '2017-09-10 23:14:31', '6', '0', null);
INSERT INTO `keymap` VALUES ('105', '分类', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('106', '品牌', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('107', '款式', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('108', '排量', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('109', '类型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('110', '发动机类型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('111', '制动类型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('112', '摩托车类型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('113', '功能', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('114', '结构', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('115', '类型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('116', '安全认证', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('117', '产地', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('118', '容量', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('119', '构造', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('120', '材质', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('121', '车型', null, null, '2017-09-10 23:14:31', '7', '0', null);
INSERT INTO `keymap` VALUES ('122', '阿萨德111', '阿德萨111', null, '2017-09-11 00:11:35', '1', '0', null);

-- ----------------------------
-- Table structure for level
-- ----------------------------
DROP TABLE IF EXISTS `level`;
CREATE TABLE `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of level
-- ----------------------------
INSERT INTO `level` VALUES ('1', '微型');
INSERT INTO `level` VALUES ('2', '小型');
INSERT INTO `level` VALUES ('3', '紧凑型');
INSERT INTO `level` VALUES ('4', '中型');
INSERT INTO `level` VALUES ('5', '中大型');
INSERT INTO `level` VALUES ('6', '豪华型');
INSERT INTO `level` VALUES ('7', 'SUV');
INSERT INTO `level` VALUES ('8', 'MPV');
INSERT INTO `level` VALUES ('9', '跑车');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES ('11', '广州');
INSERT INTO `location` VALUES ('12', '长沙');
INSERT INTO `location` VALUES ('13', '深圳');
INSERT INTO `location` VALUES ('14', '深圳');

-- ----------------------------
-- Table structure for model
-- ----------------------------
DROP TABLE IF EXISTS `model`;
CREATE TABLE `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of model
-- ----------------------------
INSERT INTO `model` VALUES ('1', '维修保养', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('2', '车载电器', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('3', '美容清洗', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('4', '汽车装饰', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('5', '安全自驾', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('6', '汽车服务', null, null, '2017-09-10 23:14:31');
INSERT INTO `model` VALUES ('7', '赛事改装', null, null, '2017-09-10 23:14:31');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `submit_time` varchar(255) DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  `pay` int(11) DEFAULT NULL,
  `del_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `buy_style` varchar(255) DEFAULT NULL,
  `buy_time` varchar(255) DEFAULT NULL,
  `guidance` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1', '1', '2017-05-19 15:03:02', '1', '0', '1', null, null, null, null, null, null, null);
INSERT INTO `order` VALUES ('4', '1', null, '3', null, null, '1', '新车全款', '7天内', '0', '业猫1', null, '35');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `context` text,
  `time` varchar(255) DEFAULT NULL,
  `flag` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL COMMENT 'column 外键  这篇文章属于某个分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('1', null, ' <p><strong>问：什么是底价买车？</strong></p><p>答：底价买车：在惠买车挑选中意车款，在线支付订金，即可获得多家4S店报出的底价，对比后选择最满意的一家，到店看车并支付购车款。</p><p><br></p><p><strong>问：为什么选择底价买车服务？</strong></p><p>答：（1）省时省力，快速获得4S店的报价</p><p>&nbsp; &nbsp; &nbsp; &nbsp;（2）不用砍价，直接获取最真实的底价</p><p>&nbsp; &nbsp; &nbsp; &nbsp;（3）惠买车认证4S店靠谱可信</p><p>&nbsp; &nbsp; &nbsp; &nbsp;（4）预付订金到惠买车，不买车订金随时退</p><p><br></p><p><strong>问：订单支付成功后，多久能收到商家报价？</strong></p><p>答：订单支付成功后，商家会在您支付后24小时内报价。</p><p><br></p><p><strong>问：商家报价的有效期是多长时间？</strong></p><p>答：商家报价的有效期是2-31天不等，具体有效期由商家决定，依照获得的底价凭证为准，请在底价凭证有效期内到店购车。</p><p><br></p><p><strong>问：可以选择多个底价凭证到店看车么？</strong></p><p>答：是的，您可以选择一个或多个底价凭证到店看车，您也可以点击按钮让商家主动联系您。</p><p><br></p><p><strong>问：买车时如何使用底价凭证？</strong></p><p>答：底价凭证详细列出了购买车型的裸车价、库存情况、置换补贴、附加条件、补充说明以及预估的税费及保险等信息，帮助您做到进店心中有数。</p><p><br></p>\r\n			', null, '1', '8');
INSERT INTO `post` VALUES ('8', null, '<p style=\"text-align: left;\"><strong>问：我是购车小白，如何选择中意车辆？</strong></p><p style=\"text-align: left;\">答：<span style=\"text-indent: 2em;\">1.选择购车城市：系统会自动定位您所在的城市，您也可以更改城市；</span></p><p style=\"text-align: left;\">&nbsp; &nbsp; &nbsp; &nbsp;2.选择品牌、车型：点击车辆品牌、价格、功能用途等选项或在搜索框中直接输入品牌或车型；同时为您精选了热门车型、团购活动、进口车、导购资讯供您参考选择；</p><p style=\"text-align: left;\">&nbsp; &nbsp; &nbsp; &nbsp;3.选择车款：在车型详情页中选择车款。</p><p style=\"text-align: left;\"><br></p><p><strong>问：我所在的城市没有开通惠买车，怎么办？</strong></p><p>答：目前惠买车开通了全国32座热门城市的选车购车服务，对于暂时没有开通的城市，您可以在“更多城市”，为您的城市投出一票，惠买车将优先开通用户较多的城市。</p>', '2017-09-26 20:58:13', '0', '9');
INSERT INTO `post` VALUES ('9', null, '<p style=\"text-align: left;\"><strong>问：我是购车小白，如何选择中意车辆？</strong></p><p style=\"text-align: left;\">答：<span style=\"text-indent: 2em;\">1.选择购车城市：系统会自动定位您所在的城市，您也可以更改城市；</span></p><p style=\"text-align: left;\">&nbsp; &nbsp; &nbsp; &nbsp;2.选择品牌、车型：点击车辆品牌、价格、功能用途等选项或在搜索框中直接输入品牌或车型；同时为您精选了热门车型、团购活动、进口车、导购资讯供您参考选择；</p><p style=\"text-align: left;\">&nbsp; &nbsp; &nbsp; &nbsp;3.选择车款：在车型详情页中选择车款。</p><p style=\"text-align: left;\"><br></p><p><strong>问：我所在的城市没有开通惠买车，怎么办？</strong></p><p>答：目前惠买车开通了全国32座热门城市的选车购车服务，对于暂时没有开通的城市，您可以在“更多城市”，为您的城市投出一票，惠买车将优先开通用户较多的城市。</p>', '2017-09-26 21:49:01', '0', '5');

-- ----------------------------
-- Table structure for price
-- ----------------------------
DROP TABLE IF EXISTS `price`;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of price
-- ----------------------------
INSERT INTO `price` VALUES ('1', '8万以内');
INSERT INTO `price` VALUES ('2', '8-12万');
INSERT INTO `price` VALUES ('3', '12-18万');
INSERT INTO `price` VALUES ('4', '18-25万');
INSERT INTO `price` VALUES ('5', '25-40万');
INSERT INTO `price` VALUES ('6', '40-80万');
INSERT INTO `price` VALUES ('7', '80万以上');

-- ----------------------------
-- Table structure for push
-- ----------------------------
DROP TABLE IF EXISTS `push`;
CREATE TABLE `push` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `series_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of push
-- ----------------------------
INSERT INTO `push` VALUES ('1', '1', '19', '3');
INSERT INTO `push` VALUES ('2', '2', '22', '1');
INSERT INTO `push` VALUES ('3', '3', '22', '2');
INSERT INTO `push` VALUES ('4', '4', '19', '4');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员');
INSERT INTO `role` VALUES ('2', '超级管理员');

-- ----------------------------
-- Table structure for seats
-- ----------------------------
DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seats
-- ----------------------------
INSERT INTO `seats` VALUES ('1', '2座');
INSERT INTO `seats` VALUES ('2', '4-5座');
INSERT INTO `seats` VALUES ('3', '6-7座');
INSERT INTO `seats` VALUES ('4', '7座以上');

-- ----------------------------
-- Table structure for serie
-- ----------------------------
DROP TABLE IF EXISTS `serie`;
CREATE TABLE `serie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of serie
-- ----------------------------
INSERT INTO `serie` VALUES ('1', '5系', '22');
INSERT INTO `serie` VALUES ('2', '3系', '22');
INSERT INTO `serie` VALUES ('3', 'A6L', '19');
INSERT INTO `serie` VALUES ('4', 'A4L', '19');
INSERT INTO `serie` VALUES ('5', 'Q5', '19');
INSERT INTO `serie` VALUES ('6', '3系GT', '22');

-- ----------------------------
-- Table structure for set
-- ----------------------------
DROP TABLE IF EXISTS `set`;
CREATE TABLE `set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of set
-- ----------------------------
INSERT INTO `set` VALUES ('1', 'GPS导航');
INSERT INTO `set` VALUES ('2', '天窗');
INSERT INTO `set` VALUES ('3', '倒车影像');
INSERT INTO `set` VALUES ('4', '涡轮增压');
INSERT INTO `set` VALUES ('5', '儿童锁');
INSERT INTO `set` VALUES ('6', '无钥匙启动');
INSERT INTO `set` VALUES ('7', '真皮座椅');
INSERT INTO `set` VALUES ('8', '氙气大灯');
INSERT INTO `set` VALUES ('9', '自动泊车');
INSERT INTO `set` VALUES ('10', 'PM2.5空气净化器');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `context` text,
  `remark` varchar(255) DEFAULT NULL,
  `jinkoushui` decimal(10,3) DEFAULT NULL,
  `key_id` varchar(255) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `del_id` int(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '壳牌（Shell）全合成机油 超凡喜力Helix ', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:03');
INSERT INTO `shop` VALUES ('2', '雪佛龙（Chevron） 特劲TCP 浓缩汽油添', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:03');
INSERT INTO `shop` VALUES ('3', 'x', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('4', 'dasd', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('5', 'dsad', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('6', 'dasd34', '100.00', null, null, '123213', null, null, '2', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('7', 'esadasd', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('8', 'ds', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('9', 'asg', '100.00', null, null, '123213', null, null, '3', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('10', 'sd', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('11', 'gdf', '100.00', null, null, '123213', null, null, '4', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('12', 'df', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('13', 'df', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('14', 'df', '100.00', null, null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('15', 'dfg', '100.00', null, null, '123213', null, null, '5', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('16', '3432', '100.00', null, null, '123213', null, null, '1', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('17', '测试', '3221.00', '2017/06/24/12eb97257t4s2v824g1q.jpg', null, '123213', null, null, '1', '0', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('18', '测试', '123123.00', '', null, '123213', null, '(10),', '1', '2', '2017-09-12 23:30:51');
INSERT INTO `shop` VALUES ('19', 'dasdasdas', '12323.00', '2017/06/25/df68cf25822773.5634b4af70647.jpeg', null, '123213', null, '(15),', '7', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('20', 'sds', '132.00', '2017/06/27/58q70vq2s7e4602wy777.jpg', null, '123213', null, '(15),(10),', '1', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('21', 'asda', '123.00', '', null, '123213', null, '(15),(8),', '1', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('22', 'sad', '123.00', '', null, '123213', null, '(52),(53),(54),(41),', '3', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('23', 'sdasd', '123.00', '2017/09/09/r1nvv4g31j95k05qlkun.jpg', null, '123213', null, '(65),(55),(66),', '4', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('24', 'asda', '123.00', '2017/09/09/2gohh04cz8z8kx671uil.jpg', null, '123213', null, '(52),(54),', '3', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('25', '撒打算的', '111.00', '', null, '123213', null, null, '1', '2', '2017-09-12 23:31:04');
INSERT INTO `shop` VALUES ('26', '测试', '9999.00', '2017/09/12/3oe839l7s1zc3yd35x1i.jpg', '啦啦啦拉拉', '测试添加', null, '(15),(8),', '1', '0', '2017-09-12 23:38:43');

-- ----------------------------
-- Table structure for sizetype
-- ----------------------------
DROP TABLE IF EXISTS `sizetype`;
CREATE TABLE `sizetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sizetype
-- ----------------------------
INSERT INTO `sizetype` VALUES ('1', '微型');
INSERT INTO `sizetype` VALUES ('2', '小型');
INSERT INTO `sizetype` VALUES ('3', '紧凑型');
INSERT INTO `sizetype` VALUES ('4', '中型');
INSERT INTO `sizetype` VALUES ('5', '中大型');
INSERT INTO `sizetype` VALUES ('6', '豪华型');
INSERT INTO `sizetype` VALUES ('7', 'MPV');
INSERT INTO `sizetype` VALUES ('8', 'SUV');

-- ----------------------------
-- Table structure for team_img
-- ----------------------------
DROP TABLE IF EXISTS `team_img`;
CREATE TABLE `team_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '描述',
  `url` varchar(255) DEFAULT NULL COMMENT '链接地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of team_img
-- ----------------------------
INSERT INTO `team_img` VALUES ('23', null, '2017/10/01/7b2t5033m78902h5zka6.jpg');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_pass` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_id2` int(255) DEFAULT NULL,
  `city_id3` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '02a05c6e278d3e19afaca4f3f7cf47d9', '15299999019', '', '业猫1', '39', null, null);
INSERT INTO `users` VALUES ('2', '', 'd41d8cd98f00b204e9800998ecf8427e', null, null, '管理员', null, null, null);
INSERT INTO `users` VALUES ('4', '15200914019', 'e10adc3949ba59abbe56e057f20f883e', null, null, '管理员', null, null, null);
INSERT INTO `users` VALUES ('5', 'root', '63a9f0ea7bb98050796b649e85481845', '15200914019', '2017-05-20 21:21:690', '管理员', null, null, null);
INSERT INTO `users` VALUES ('6', 'root', '63a9f0ea7bb98050796b649e85481845', '15200914019', '2017-05-20 21:32:220', '管理员', null, null, null);
INSERT INTO `users` VALUES ('7', 'root', '63a9f0ea7bb98050796b649e85481845', '1421312', '2017-05-20 21:32:533', 'dasdas', null, null, null);
INSERT INTO `users` VALUES ('8', 'ad', '523af537946b79c4f8369ed39ba78605', 'ad', '2017-05-20 21:36:690', 'ad', null, null, null);
INSERT INTO `users` VALUES ('9', '1', 'c4ca4238a0b923820dcc509a6f75849b', '17704005789', '2017-09-20 23:17:846', '管理员', '39', null, null);

-- ----------------------------
-- Table structure for years
-- ----------------------------
DROP TABLE IF EXISTS `years`;
CREATE TABLE `years` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of years
-- ----------------------------
INSERT INTO `years` VALUES ('1', '2016');
INSERT INTO `years` VALUES ('2', '2017');
