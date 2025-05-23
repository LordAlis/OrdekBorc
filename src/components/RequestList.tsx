import { Request } from '../types';

interface RequestListProps {
  requests: Request[];
  currentUser: string;
  title?: string;
}

export function RequestList({ requests, currentUser, title }: RequestListProps) {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No requests to show</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {request.type === 'borrow'
                    ? `${request.from} borrowed from ${request.to}`
                    : `${request.from} lent to ${request.to}`}
                </p>
                <p className="text-lg font-semibold">${request.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{request.description}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(request.timestamp)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}