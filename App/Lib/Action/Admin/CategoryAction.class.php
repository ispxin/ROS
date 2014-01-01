<?php

class CategoryAction extends CommonAction {
	
	// 文章目录首页 <视图>
	public function index() {
		import('Class.Category', APP_PATH);
		$category_list = M('Category') -> order('sort ASC') -> select();
		$category_list = Category::unlimitedForLevel($category_list);

		foreach ($category_list as $key => $value) {
			$category_list[$key]['article_count'] = $this -> getCategoryArticleCount($value['id']);
		}
		
		$this -> assign('category_list', $category_list);
		$this -> display();
	}

	// 添加文章目录 <保存>
	public function addSave() {
		
		$Category = D('Category');

		$data = $Category -> create();

		if (!$data) {
			exit( $this -> error( $Category -> getError() ) );
		}

		$result = $Category -> add();

		if ($result) {
			$this -> success('添加成功！', '__GROUP__/Category');
		} else {
			$this -> error('添加失败！');
		}
		
	}
	
	// 编辑文章目录 <视图>
	public function edit() {
		
		$id = $this -> _get('id');
		$field = M('Category') -> where(array('id' => $id)) -> find();

		import('Class.Category', APP_PATH);
		$category_list = M('Category') -> order('sort ASC') -> select();
		$category_list = Category::unlimitedForLevel($category_list);
		
		if ($field) {
			$this -> assign('field', $field);
			$this -> assign('category_list', $category_list);
		} else {
			$this -> error('编辑项不存在！');
		}
		
		$this -> display();
	}
	
	// 编辑文章目录 <保存>
	public function editSave() {
		
		$Category = D('Category');

		$data = $Category -> create();

		if (!$data) {
			exit( $this -> error( $Category -> getError() ) );
		}

		$result = $Category -> where(array('id' => $data['id'])) -> save($data);

		if ($result) {
			$this -> success('编辑成功！', '__GROUP__/Category');
		} else {
			$this -> error('编辑失败！');
		}
		
	}
	
	// 更新排序 <保存>
	public function sortSave() {

		$Category = M('Category');
		
		foreach ($_POST as $id => $sort) {
			$Category -> where(array('id'=>$id)) -> setField('sort', $sort);
		}
		
		$this -> success('更新成功！', '__GROUP__/Category');
		
	}

	// 删除目录 <删除>
	public function delete() {

		$id = $this -> _get('id');

		$count = $this -> getCategoryArticleCount($id);

		if($this -> isParent($id)) {
			$this -> error('此文章目录下有子目录，不能删除！');
		}

		if ($count > 0) {
			$this -> error('此文章目录下有文章，不能删除！');
		}

		$result = M('Category') -> where(array('id' => $id)) -> delete();

		if ($result) {
			$this -> success('删除成功！', '__GROUP__/Category');
		} else {
			$this -> error('删除失败！');
		}

	}

	// 获取文章目录下文章数 <内部方法>
	protected function getCategoryArticleCount($category) {

		$count = M('Article') -> where(array('category' => $category)) -> count();

		return $count;
		
	}


	// 判断文章目录是否为父级 <内部方法>
	protected function isParent($category) {

		$count = M('Category') -> where(array('parent' => $category)) -> count();

		if ($count > 0) {
			return true;
		} else {
			return false;
		}

	}

}