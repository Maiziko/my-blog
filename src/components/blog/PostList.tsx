// src/components/blog/PostList.tsx
import React, { useState } from 'react';
import { Row, Col, Pagination, Empty, Spin } from 'antd';
import PostCard from './PostCard';
import { usePostsQuery } from '../../hooks/usePost';

const PostList: React.FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 9
  });
  
  const { data, isLoading, isError } = usePostsQuery(pagination);
  
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, per_page: pageSize });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="Error loading posts. Please try again later." />
      </div>
    );
  }
  
  if (!data?.data || data.data.length === 0) {
    return <Empty description="No posts found" />;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {data.data.map((post) => (
          <Col xs={24} sm={12} lg={8} key={post.id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
      
      <div className="mt-8 flex justify-center">
        <Pagination
          current={pagination.page}
          pageSize={pagination.per_page}
          total={data.meta.pagination.total}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={['6', '9', '12', '24']}
        />
      </div>
    </div>
  );
};

export default PostList;