export interface Comment {
  user: {
    name: string;
  };
  content: string;
}

interface CommentProps {
  comments: Comment[];
  loading: boolean;
}

export const Comment = ({ comments, loading }: CommentProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className=" mb-2 pb-2 font-semibold text-1xl">Comments:</h3>
      <div className="w-full h-[40vh] overflow-y-auto bg-white p-4 shadow-md rounded-lg">
        {comments.map((comment, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold">{comment.user.name}</h3>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
