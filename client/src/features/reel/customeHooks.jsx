import { useQuery } from "@tanstack/react-query";
import { getReelsByUserId } from "./reelThunk";

export const useReels = (userId, options = {}) => {
  return useQuery({
    queryKey: ["reels", userId],
    queryFn: () => getReelsByUserId(userId),
    enabled: !!userId, // Fetch only if userId exists
  });
};
