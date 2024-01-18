import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const SetCookieComponent = () => {
  useEffect(() => {
    // Set a cookie
    Cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrc2hheUBnbWFpbC5jb20iLCJpZCI6IjY0MTZhYjRiYmZhNjkwMTkxOGY0YTI4NyIsImlhdCI6MTcwNTU4MDI3MH0.OZjIgu9es9T40xkore4JqFwOM0YkrOExrykSU-AUWXQ', { expires: 1, path: '/' });
  }, []);

  return null;
};

export default SetCookieComponent;
