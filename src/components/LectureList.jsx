import axios from 'axios';

import useAsync from '../hooks/useAsync';

async function fetchLectures() {
  const response = await axios.get('http://192.168.0.13:3000/lectures.json');
  return response.data;
}

export default function LectureList() {
  const [state, fetchData] = useAsync(fetchLectures, [], false);

  const { loading, error, data: lectures } = state;

  if (loading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>에러발생!</div>;
  }
  if (!lectures) return null;

  return (
    <ul>
      {lectures.map((lecture, i) => (
        <li key={i}>{lecture.subjectName}</li>
      ))}
    </ul>
  );
}
