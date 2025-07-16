import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="py-8">
      {/* Layout wrapper keeps content centered and padded */}
      <Container>
        {/* Main form component for creating a post */}
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;