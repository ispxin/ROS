/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50090
Source Host           : localhost:3306
Source Database       : ros

Target Server Type    : MYSQL
Target Server Version : 50090
File Encoding         : 65001

Date: 2013-12-30 18:46:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ros_user`
-- ----------------------------
DROP TABLE IF EXISTS `ros_user`;
CREATE TABLE `ros_user` (
  `id` int(11) NOT NULL auto_increment,
  `user` char(255) default NULL,
  `password` char(255) default NULL,
  `regtime` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of ros_user
-- ----------------------------
INSERT INTO `ros_user` VALUES ('1', 'ispxin@vip.qq.com', '21232f297a57a5a743894a0e4a801fc3', '1386829188');
INSERT INTO `ros_user` VALUES ('2', 'aaa@qq.com', 'fcea920f7412b5da7be0cf42b8c93759', '1386829188');
INSERT INTO `ros_user` VALUES ('3', 'bbb@qq.com', 'fcea920f7412b5da7be0cf42b8c93759', '1386829188');
INSERT INTO `ros_user` VALUES ('4', 'ccc@qq.com', 'fcea920f7412b5da7be0cf42b8c93759', '1386829188');
INSERT INTO `ros_user` VALUES ('5', 'ddd@qq.com', 'fcea920f7412b5da7be0cf42b8c93759', '1386830447');
INSERT INTO `ros_user` VALUES ('6', 'sss@qq.com', '698d51a19d8a121ce581499d7b701668', '1386831562');
INSERT INTO `ros_user` VALUES ('7', 'hhh@qq.com', 'fcea920f7412b5da7be0cf42b8c93759', '1386832561');
