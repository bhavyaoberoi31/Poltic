'use client';

import { useRouter } from 'next/navigation';
import { UserRound } from 'lucide-react';

// Sample subscribed channels
const SubscribedChannels = [
  { name: "Niket Raj Dwivedi", attherate: "@niketdwivedi", followers: "10" },
  { name: "Amit", attherate: "@amitverse", followers: "10" },
  { name: "Aaskash", attherate: "@aaskashlive", followers: "10" },
  { name: "Ashish", attherate: "@ashish_world", followers: "10" },
  { name: "Priya", attherate: "@priyavibes", followers: "10" },
  { name: "Mohit Gupta", attherate: "@mohitgupta_07", followers: "10" },
  { name: "Ashish", attherate: "@theashishshow", followers: "10" },
  // { name: "Mamta", attherate: "@mamtaofficial", followers: "10" },
];

export default function FollowedChannelsPage() {
  const router = useRouter();

  // These are two creators with real images as a sample, could be dynamic on your side
  const topChannels = [
    {
      profile:
        "https://reels-poltic.b-cdn.net/1754072074859-1000036494.png",
      name: "PolTic Official",
      attherate: "@polticofficial",
      followers: "10",
      creatorId: "688d03c489562cd4f73509dc",
      userId: "688d03c489562cd4f73509dc",
      userImage: "https://reels-poltic.b-cdn.net/1754072074859-1000036494.png",
    },
    {
      profile:
        "https://reels-poltic.b-cdn.net/1754073027260-1000047996.jpg",
      name: "Bhavya Oberoi",
      attherate: "@bhavya",
      followers: "10",
      creatorId: "687dbc083aa05c8b398ad946",
      userId: "687dbc083aa05c8b398ad946",
      userImage: "https://reels-poltic.b-cdn.net/1754073027260-1000047996.jpg",
    },
    {
      profile:
        "https://reels-poltic.b-cdn.net/1754072866492-amit2.jpg",
      name: "Amit Barmola",
      attherate: "@amit",
      followers: "10",
      creatorId: "688d05a489562cd4f73509f6",
      userId: "688d05a489562cd4f73509f6",
      userImage: "https://reels-poltic.b-cdn.net/1754072866492-amit2.jpg",
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col">
        <h2 className="text-[22px] md:text-[26px] font-bold text-center mb-7">
          All Followers
        </h2>
        <div className="grid gap-5">
          {/* Top channels with real images */}
          {topChannels.map((ch) => (
            <div
              key={ch.name}
              className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition"
              onClick={() =>
                router.push(
                  `/user/${ch.creatorId}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={ch.profile}
                  alt={ch.name}
                  className="h-14 w-14 rounded-full object-cover border border-accent"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{ch.name}</span>
                  <span className="text-sm text-muted-foreground">{ch.attherate}</span>
                  <span className="text-xs mt-1 text-primary font-medium">
                    {ch.followers} <span className="text-muted-foreground font-normal">Followers</span>
                  </span>
                </div>
              </div>
              <button
                className="bg-muted px-4 py-1.5 rounded-md text-xs text-primary-foreground/80 font-medium"
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
              >
                Followed
              </button>
            </div>
          ))}

          {/* Rest subscribed channels with Lucide icon */}
          {SubscribedChannels.map((channel) => (
            <div
              key={channel.attherate}
              className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center border border-accent">
                  <UserRound className="w-8 h-8 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{channel.name}</span>
                  <span className="text-sm text-muted-foreground">{channel.attherate}</span>
                  <span className="text-xs mt-1 text-primary font-medium">
                    {channel.followers} <span className="text-muted-foreground font-normal">Followers</span>
                  </span>
                </div>
              </div>
              <button
                className="bg-muted px-4 py-1.5 rounded-md text-xs text-primary-foreground/80 font-medium"
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
              >
                Followed
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
