<?php

class AppAction extends CommonAction {
	
	// 所有文章 <视图>
    public function index() {

    	$article = M('Article');

    	// 判断状态
    	if (isset($_GET['state'])) {
    		$article_state =  $this -> _get('state');
    	} else {
    		$article_state = 1;
    	}

    	// 获取某个状态
    	$where['state'] = $article_state;

    	// 获取某个目录
    	if (!empty($_GET['category'])) {
    		$where['category'] = $this -> _get('category');
    	}

    	// 分页实例化
    	$page = $this -> paging($article, $where);

    	// 获取文章数
    	$article_count = $this -> getArticleCount();

    	// 获取文章列表
    	$article_list = $article -> where($where) -> order('id desc') -> limit($page -> firstRow.','.$page -> listRows) -> select();

    	// 获取文章目录名称
    	foreach ($article_list as $key => $value) {
			$article_list[$key]['category_name'] = $this -> getArticleCategory($value['category']);
		}

		$this -> assign('article_state', $article_state);
		$this -> assign('article_count', $article_count);
		$this -> assign('article_list', $article_list);
		$this -> assign('page', $page -> show());
		$this -> display();
		
    }
	
	// 写文章 <视图>
	public function add() {

		import('Class.Category', APP_PATH);
		$category_list = M('Category') -> order('sort ASC') -> select();
		$category_list = Category::unlimitedForLevel($category_list);

		$this -> assign('category_list', $category_list);
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
	// $state = 0 => 草稿
	// $state = 2 => 回收站
	public function change() {

		$id = $this -> _get('id');
		$state = $this -> _get('state');

		$result = M('Article') -> where(array('id' => $id)) -> setField('state', $state);

		if ($result) {
			$this -> success('操作成功！', '__GROUP__/Article');
		} else {
			$this -> error('操作失败！');
		}

	}

	// 永久删除文章 <删除>
	public function delete() {

		$id = $this -> _get('id');

		$result = M('Article') -> where(array('id' => $id)) -> delete();

		if ($result) {
			$this -> success('删除成功！', '__GROUP__/Article');
		} else {
			$this -> error('删除失败！');
		}

	}

	// 获取文章数 <内部方法>
	protected function getArticleCount() {
		$article = M('Article');
		$arr['draft'] = $article -> where(array('state' => 0)) -> count();
		$arr['posted'] = $article -> where(array('state' => 1)) -> count();
		$arr['rubbish'] = $article -> where(array('state' => 2)) -> count();
		return $arr;
	}
	
}