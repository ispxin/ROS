-- phpMyAdmin SQL Dump
-- version 4.0.8
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2014-01-05 00:08:01
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
-- 表的结构 `ros_admin`
--

CREATE TABLE IF NOT EXISTS `ros_admin` (
  `id` int(11) NOT NULL,
  `user` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ros_admin`
--

INSERT INTO `ros_admin` (`id`, `user`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- 表的结构 `ros_app`
--

CREATE TABLE IF NOT EXISTS `ros_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `type` char(50) CHARACTER SET utf8 NOT NULL,
  `title` char(50) CHARACTER SET utf8 NOT NULL,
  `icon` char(50) CHARACTER SET utf8 NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `url` char(50) CHARACTER SET utf8 NOT NULL,
  `isMax` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `author` char(255) COLLATE utf8_bin NOT NULL,
  `pubdate` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ros_app`
--

INSERT INTO `ros_app` (`id`, `category`, `type`, `title`, `icon`, `width`, `height`, `url`, `isMax`, `state`, `description`, `author`, `pubdate`) VALUES
(1, 1, 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 0, NULL, 'ispxin', 1386829188),
(2, 1, 'app', '我的博客', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 1, NULL, 'ispxin', 1386829188),
(3, 5, 'app', 'QQ音乐', '/ros/Public/Home/images/app/clover.png', 500, 300, 'http://www.wangyingran.com', 1, 1, NULL, 'ispxin', 1386829188);

-- --------------------------------------------------------

--
-- 表的结构 `ros_category`
--

CREATE TABLE IF NOT EXISTS `ros_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `ros_category`
--

INSERT INTO `ros_category` (`id`, `name`, `sort`) VALUES
(1, '网站', 2),
(2, '娱乐', 5),
(3, '游戏', 100),
(4, '生活', 100),
(5, '音乐', 100),
(6, '工具', 100);

-- --------------------------------------------------------

--
-- 表的结构 `ros_user`
--

CREATE TABLE IF NOT EXISTS `ros_user` (
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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `ros_user`
--

INSERT INTO `ros_user` (`id`, `user`, `password`, `desk1`, `desk2`, `desk3`, `desk4`, `desk5`, `sortType`, `regtime`) VALUES
(1, 'guest@ros.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1', 'app_2', 'app_3', '', '', '', 1386829188),
(2, 'ispxin@vip.qq.com', '21232f297a57a5a743894a0e4a801fc3', 'app_1,app_2', 'app_3', '', '', '', '', 1386829188),
(3, 'bbb@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', 1386829188),
(4, 'ccc@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', 1386829188),
(5, 'ddd@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', 1386830447),
(6, 'sss@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', 1386831562),
(7, 'hhh@qq.com', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '', '', 1386832561),
(11, '111@qq.com', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', '', '', '', '', 1388834639),
(12, '222@qq.com', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', '', '', '', '', 1388834867),
(13, '333@qq.com', '96e79218965eb72c92a549dd5a330112', '', '', '', '', '', '', 1388834915),
(14, '444@qq.com', '96e79218965eb72c92a549dd5a330112', '', '', '', '', '', '', 1388834954),
(15, '555@qq.com', '96e79218965eb72c92a549dd5a330112', '', '', '', '', '', '', 1388835089);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
