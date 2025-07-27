'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Simulate fetching reported videos
    const dummyData = [
      // {
      //   id: '1',
      //   title: 'Fake News Report',
      //   views: 1234,
      //   reports: 5,
      //   thumbnail: '/assets/thumb.png',
      // },
      // {
      //   id: '2',
      //   title: 'Controversial Clip',
      //   views: 876,
      //   reports: 3,
      //   thumbnail: '/assets/thumb.png',
      // },
    ];
    setVideos(dummyData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-roboto p-6">
      <h1 className="text-2xl font-semibold mb-6">Reported Videos</h1>

      {videos.length === 0 ? (
        <div className="text-center text-green-600">
          Congrats, no videos of yours have been reported yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto max-w-7xl">
          {videos.map((short) => (
            <div key={short.id} className="flex flex-col">
              <Link href={`/short/${short.id}`} className="flex flex-col">
                <Image
                  src={short.thumbnail}
                  alt={short.title}
                  width={180}
                  height={265}
                  className="h-[265px] object-cover rounded-lg w-full"
                />
                <div>
                  <p className="font-light mt-2">{short.title}</p>
                  
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
