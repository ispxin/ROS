/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Version : 50612
 Source Host           : localhost
 Source Database       : ros

 Target Server Version : 50612
 File Encoding         : utf-8

 Date: 01/01/2014 22:05:24 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `ros_admin`
-- ----------------------------
DROP TABLE IF EXISTS `ros_admin`;
CREATE TABLE `ros_admin` (
  `id` int(11) NOT NULL,
  `user` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `ros_admin`
-- ----------------------------
BEGIN;
INSERT INTO `ros_admin` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3');
COMMIT;

-- ----------------------------
--  Table structure for `ros_app`
-- ----------------------------
DROP TABLE IF EXISTS `ros_app`;
CREATE TABLE `ros_app` (
  `id` int(11) NOT NULL,
  `appid` char(50) CHARACTER SET utf8 NOT NULL,
  `category` int(11) NOT NULL,
  `type` char(50) CHARACTER SET utf8 NOT NULL,
  `title` char(50) CHARACTER SET utf8 NOT NULL,
  `icon` char(50) CHARACTER SET utf8 NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `url` char(50) CHARACTER SET utf8 NOT NULL,
  `isMax` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `ros_app`
-- ----------------------------
BEGIN;
INSERT INTO `ros_app` VALUES ('1', 'app_1', '0', 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1'), ('2', 'app_2', '0', 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1'), ('3', 'app_3', '0', 'app', 'QQ音乐', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1');
COMMIT;

-- ----------------------------
--  Table structure for `ros_user`
-- ----------------------------
DROP TABLE IF EXISTS `ros_user`;
CREATE TABLE `ros_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `desk1` longtext NOT NULL,
  `desk2` longtext NOT NULL,
  `desk3` longtext NOT NULL,
  `desk4` longtext NOT NULL,
  `desk5` longtext NOT NULL,
  `sortType` varchar(255) NOT NULL,
  `regtime` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `ros_user`
-- ----------------------------
BEGIN;
INSERT INTO `ros_user` VALUES ('0', 'guest@ros.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1', 'app_2', 'app_3', '', '', '', '1386829188'), ('1', 'ispxin@vip.qq.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1,app_2', 'app_3', '', '', '', '', '1386829188'), ('2', 'bbb@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386829188'), ('3', 'ccc@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386829188'), ('4', 'ddd@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386830447'), ('5', 'sss@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386831562'), ('6', 'hhh@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386832561');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
