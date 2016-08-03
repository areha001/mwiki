
ALTER TABLE `t_word`
ADD COLUMN `edit_time`  timestamp NOT NULL DEFAULT '2016-01-01' AFTER `parent_name`;

DROP TABLE IF EXISTS `t_visit_count`;
CREATE TABLE `t_visit_count` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `route` varchar(255) NOT NULL COMMENT '标签名',
  `sub_id` varchar(255) NOT NULL COMMENT '标签ID',
  `edit_count` int(11) NOT NULL,
  `visit_count` int(11) NOT NULL COMMENT '访问次数',
  `last_visit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后访问',
  PRIMARY KEY (`id`),
  KEY `FK_t_tag_1` (`sub_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='访问统计';
