<?php

class IndexAction extends CommonAction {
	
    public function index() {
    	//session(null);
    	//dump($_SESSION);
    	$this -> display();
    }

	/**
	 * Ajax获取App
	 */
	public function getApp() {
		
		$App = M('App');
		$Userapp = M('Userapp');
		
		if ( !isset ( $_SESSION['userid'] ) ) {
			$userid = 1;
		} else {
			$userid = $_SESSION['userid'];
		}

		$allApp = $Userapp -> where(array('userid' => $userid)) -> order('id asc') -> select();
		
		$appData = array();
		
		for ($i=1; $i<=5; $i++) {
			array_push($appData, array());
			foreach ($allApp as $key => $value) {
				if ($value['desk'] == $i) {
					
					// App类型 type => 1
					if ($value['type'] == 1) {
						$app = $App -> where(array('id' => $value['appid'], 'state' => 1)) -> field('id,title,url,icon,width,height,isMax') -> find();
						$app['type'] = 'app';
						array_push($appData[$i-1], $app);
					}
					
				}
			}
		}
		
		$this -> ajaxReturn($appData, '成功', 1);
	}
	
}