/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50090
Source Host           : localhost:3306
Source Database       : ros

Target Server Type    : MYSQL
Target Server Version : 50090
File Encoding         : 65001

Date: 2014-01-02 13:49:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ros_admin`
-- ----------------------------
DROP TABLE IF EXISTS `ros_admin`;
CREATE TABLE `ros_admin` (
  `id` int(11) NOT NULL,
  `user` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ros_admin
-- ----------------------------
INSERT INTO `ros_admin` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- ----------------------------
-- Table structure for `ros_app`
-- ----------------------------
DROP TABLE IF EXISTS `ros_app`;
CREATE TABLE `ros_app` (
  `id` int(11) NOT NULL,
  `appid` char(50) character set utf8 NOT NULL,
  `category` int(11) NOT NULL,
  `type` char(50) character set utf8 NOT NULL,
  `title` char(50) character set utf8 NOT NULL,
  `icon` char(50) character set utf8 NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `url` char(50) character set utf8 NOT NULL,
  `isMax` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ros_app
-- ----------------------------
INSERT INTO `ros_app` VALUES ('1', 'app_1', '0', 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1');
INSERT INTO `ros_app` VALUES ('2', 'app_2', '0', 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1');
INSERT INTO `ros_app` VALUES ('3', 'app_3', '0', 'app', 'QQ音乐', '/ros/Public/Home/images/app/clover.png', '500', '300', 'http://www.wangyingran.com', '1');

-- ----------------------------
-- Table structure for `ros_user`
-- ----------------------------
DROP TABLE IF EXISTS `ros_user`;
CREATE TABLE `ros_user` (
  `id` int(11) NOT NULL auto_increment,
  `user` char(255) default NULL,
  `password` char(255) default NULL,
  `desk1` longtext NOT NULL,
  `desk2` longtext NOT NULL,
  `desk3` longtext NOT NULL,
  `desk4` longtext NOT NULL,
  `desk5` longtext NOT NULL,
  `sortType` varchar(255) NOT NULL,
  `regtime` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of ros_user
-- ----------------------------
INSERT INTO `ros_user` VALUES ('1', 'guest@ros.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1', 'app_2', 'app_3', '', '', '', '1386829188');
INSERT INTO `ros_user` VALUES ('2', 'ispxin@vip.qq.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1,app_2', 'app_3', '', '', '', '', '1386829188');
INSERT INTO `ros_user` VALUES ('3', 'bbb@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386829188');
INSERT INTO `ros_user` VALUES ('4', 'ccc@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386829188');
INSERT INTO `ros_user` VALUES ('5', 'ddd@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386830447');
INSERT INTO `ros_user` VALUES ('6', 'sss@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386831562');
INSERT INTO `ros_user` VALUES ('7', 'hhh@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', '1386832561');
