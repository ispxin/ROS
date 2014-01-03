<?php

class AppAction extends CommonAction {
	
	// 所有应用 <视图>
    public function index() {

    	$App = M('App');

    	// 判断状态
    	if (isset($_GET['state'])) {
    		$app_state =  $this -> _get('state');
    	} else {
    		$app_state = 1;
    	}

    	// 获取某个状态
    	$where['state'] = $app_state;

    	// 获取某个目录
    	if (!empty($_GET['category'])) {
    		$where['category'] = $this -> _get('category');
    	}

    	// 分页实例化
    	$Page = $this -> paging($App, $where);

    	// 获取应用数
    	$app_count = $this -> getAppCount();

    	// 获取应用列表
    	$app_list = $App -> where($where) -> order('id desc') -> limit($Page -> firstRow.','.$Page -> listRows) -> select();

    	// 获取文章目录名称
    	foreach ($app_list as $key => $value) {
			$app_list[$key]['category_name'] = $this -> getAppCategory($value['category']);
		}

		$this -> assign('app_state', $app_state);
		$this -> assign('app_count', $app_count);
		$this -> assign('app_list', $app_list);
		$this -> assign('page', $Page -> show());
		$this -> display();
		
    }
	
	// 写文章 <视图>
	public function add() {

		
		$this -> display();

	}

	// 发布文章 <保存>
	public function addSave() {

		$article = D('Article');
		
		$data = $article -> create();
		
		if (!$data) {
			exit( $this -> error( $article -> getError() ) );
		}

		$result = $article -> add($data);
		
		if ($result) {
			$this -> success('发布成功！', '__GROUP__/Article');
		} else {
			$this -> error('发布失败！');
		}

	}

	// 编辑文章 <视图>
	public function edit() {

		$id = $this -> _get('id');
		$field = M('Article') -> where(array('id' => $id)) -> find();
		
		if ($field) {
			$field['category_name'] = $this -> getArticleCategory($field['category']);

			import('Class.Category', APP_PATH);
			$category_list = M('Category') -> order('sort ASC') -> select();
			$category_list = Category::unlimitedForLevel($category_list);

			$this -> assign('field', $field);
			$this -> assign('category_list', $category_list);
		} else {
			$this -> error('编辑项不存在！');
		}

		$this -> display();

	}

	// 保存编辑文章 <保存>
	public function editSave() {

		$article = D('Article');
		
		$data = $article -> create();

		if (!$data) {
			exit( $this -> error( $article -> getError() ) );
		}

		$result = $article -> where(array('id' => $data['id'])) -> save($data);
		
		if ($result) {
			$this -> success('操作成功！', '__GROUP__/Article');
		} else {
			$this -> error('操作失败！');
		}

	}

	// 改变文章状态 <保存>
	// $state = 0 => 回收站
	// $state = 1 => 已发布
	public function change() {

		$id = $this -> _get('id');
		$state = $this -> _get('state');

		$result = M('App') -> where(array('id' => $id)) -> setField('state', $state);

		if ($result) {
			$this -> success('操作成功！', '__GROUP__/App');
		} else {
			$this -> error('操作失败！');
		}

	}

	// 永久删除文章 <删除>
	public function delete() {

		$id = $this -> _get('id');

		$result = M('App') -> where(array('id' => $id)) -> delete();

		if ($result) {
			$this -> success('删除成功！', '__GROUP__/Article');
		} else {
			$this -> error('删除失败！');
		}

	}

	// 获取应用数 <内部方法>
	protected function getAppCount() {
		$App = M('App');
		$arr['rubbish'] = $App -> where(array('state' => 0)) -> count();
		$arr['posted'] = $App -> where(array('state' => 1)) -> count();
		return $arr;
	}
	
}