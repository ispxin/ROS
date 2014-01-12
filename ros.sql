-- phpMyAdmin SQL Dump
-- version 4.0.8
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2014-01-12 21:54:10
-- 服务器版本: 5.6.12
-- PHP 版本: 5.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `ros`
--

-- --------------------------------------------------------

--
-- 表的结构 `ros_app`
--

CREATE TABLE IF NOT EXISTS `ros_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `title` char(255) CHARACTER SET utf8 NOT NULL,
  `icon` char(255) CHARACTER SET utf8 NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `url` char(255) CHARACTER SET utf8 NOT NULL,
  `isMax` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `author` char(50) COLLATE utf8_bin NOT NULL,
  `pubdate` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `ros_app`
--

INSERT INTO `ros_app` (`id`, `category`, `title`, `icon`, `width`, `height`, `url`, `isMax`, `state`, `description`, `author`, `pubdate`) VALUES
(1, 1, '我的博客', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 1, NULL, 'ispxin', 1386829188),
(2, 1, '我的博客', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 1, NULL, 'ispxin', 1386829188),
(3, 5, 'QQ音乐', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 1, '', 'ispxin', 1386829188),
(4, 1, '读书天下', 'http://4.web.qstatic.com/webqqpic/pubapps/2/2534/images/big.png', 715, 530, 'http://www.dooland.com/magazine/api/q+/flash.php', 0, 1, '读书天下描述啊～', '平台提供', 1386829188),
(5, 1, '腾讯微博', 'http://2.web.qstatic.com/webqqpic/pubapps/0/2/images/big.png', 1000, 800, 'http://t.qq.com', 1, 1, '腾讯微博简介哦～~~~', '平台提供', 1386829188);

-- --------------------------------------------------------

--
-- 表的结构 `ros_category`
--

CREATE TABLE IF NOT EXISTS `ros_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `ros_category`
--

INSERT INTO `ros_category` (`id`, `name`, `sort`) VALUES
(1, '网站', 2),
(2, '娱乐', 5),
(3, '游戏', 100),
(4, '生活', 100),
(5, '音乐', 100),
(6, '工具', 100),
(7, '视频', 100);

-- --------------------------------------------------------

--
-- 表的结构 `ros_user`
--

CREATE TABLE IF NOT EXISTS `ros_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL,
  `user` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `state` int(11) NOT NULL COMMENT '会员状态：\r\n0 => 锁定\r\n1 => 正常',
  `regtime` int(11) NOT NULL,
  `ip` char(50) NOT NULL,
  `lastlogintime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `ros_user`
--

INSERT INTO `ros_user` (`id`, `role`, `user`, `password`, `state`, `regtime`, `ip`, `lastlogintime`) VALUES
(1, 1, 'admin@ros.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386829188, '127.0.0.1', 1389422206),
(2, 0, 'ispxin@vip.qq.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386829188, '127.0.0.1', 1389406447),
(3, 0, 'bbb@qq.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386829188, '', 0),
(4, 0, 'ccc@qq.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386829188, '', 0),
(5, 0, 'ddd@qq.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386830447, '', 0),
(6, 0, 'sss@qq.com', '21232f297a57a5a743894a0e4a801fc3', 1, 1386831562, '', 0),
(7, 0, 'hhh@qq.com', '21232f297a57a5a743894a0e4a801fc3', 0, 1386832561, '', 0),
(11, 0, '111@qq.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 1388834639, '', 0),
(12, 0, '222@qq.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 1388834867, '', 0),
(13, 0, '333@qq.com', '96e79218965eb72c92a549dd5a330112', 1, 1388834915, '', 0),
(14, 0, '444@qq.com', '96e79218965eb72c92a549dd5a330112', 1, 1388834954, '', 0),
(15, 0, '555@qq.com', '96e79218965eb72c92a549dd5a330112', 1, 1388835089, '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ros_userapp`
--

CREATE TABLE IF NOT EXISTS `ros_userapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `appid` int(11) NOT NULL,
  `desk` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=112 ;

--
-- 转存表中的数据 `ros_userapp`
--

INSERT INTO `ros_userapp` (`id`, `type`, `appid`, `desk`, `userid`) VALUES
(78, 1, 4, 1, 3),
(79, 1, 5, 1, 3),
(102, 1, 1, 1, 2),
(108, 1, 5, 1, 2),
(107, 1, 4, 1, 2),
(80, 1, 3, 2, 3),
(103, 1, 2, 1, 2),
(105, 1, 3, 1, 2),
(109, 1, 4, 1, 1),
(110, 1, 5, 1, 1),
(111, 1, 3, 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
