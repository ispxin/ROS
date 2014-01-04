<?php

class IndexAction extends CommonAction {
	
    public function index() {
    	
		//$this -> getApp();
		
    	//session(null);
    	//dump($_SESSION);
    	$this -> display();
    }
	
	public function getApp() {
		
		$App = M('App');
		$User = M('User');
		
		if ( !isset ( $_SESSION['userid'] ) ) {
			$userid = 1;
		} else {
			$userid = $_SESSION['userid'];
		}
		
		$deskData = $User -> getField('id,desk1,desk2,desk3,desk4,desk5');
		$appData = array();
		
		for ($i=1; $i<=5; $i++) {
			array_push($appData, array());	
			$appIdList = explode(',', $deskData[$userid]['desk'.$i]);
			foreach ($appIdList as $v) {
				$v = explode('_', $v);
				$app = $App -> where(array('id' => $v[1])) -> find();
				array_push($appData[$i-1], $app);
			}
		}

		$this -> ajaxReturn($appData, '成功', 1);
		
	}
	
}