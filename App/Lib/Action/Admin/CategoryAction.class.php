<?php

class CategoryAction extends CommonAction {
	
	// 分类首页 <视图>
	public function index() {
		
		$Category = M('Category');
		
		$category_list = $Category -> order('sort asc') -> select();
		
		foreach ($category_list as $key => $value) {
			$category_list[$key]['app_count'] = $this -> getCategoryAppCount($value['id']);
		}
		
		$this -> assign('category_list', $category_list);
		$this -> display();
	}

	// 添加分类 <保存>
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
	
	// 编辑分类 <视图>
	public function edit() {
		
		$id = $this -> _get('id');
		$field = M('Category') -> where(array('id' => $id)) -> find();
		
		if ($field) {
			$this -> assign('field', $field);
			$this -> assign('category_list', $category_list);
		} else {
			$this -> error('编辑项不存在！');
		}
		
		$this -> display();
	}
	
	// 编辑分类 <保存>
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

	// 删除分类 <删除>
	public function delete() {

		$id = $this -> _get('id');

		$count = $this -> getCategoryAppCount($id);

		if ($count > 0) {
			$this -> error('此分类下有应用，不能删除！');
		}

		$result = M('Category') -> where(array('id' => $id)) -> delete();

		if ($result) {
			$this -> success('删除成功！', '__GROUP__/Category');
		} else {
			$this -> error('删除失败！');
		}

	}

	// 获取分类下应用数 <内部方法>
	protected function getCategoryAppCount($category) {

		$count = M('App') -> where(array('category' => $category)) -> count();

		return $count;
		
	}

}