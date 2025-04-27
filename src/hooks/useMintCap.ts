import { useQuery } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";

//Constants
import { MINT_CAP_TYPE } from "../../constants";

export function useMintCap() {
  const account = useCurrentAccount();
  console.log("useMintCap", account);
  return useQuery({
    queryKey: ["mintCap"],
    queryFn: async () => {
      if (!account) throw new Error("No account found");
      const client = new SuiClient({ url: getFullnodeUrl("testnet") });

      const MintCapData = await client.getOwnedObjects({
        owner: account.address ?? "",
        filter: {
          StructType: MINT_CAP_TYPE,
        },
      });
      console.log("MintCapData", MintCapData);
      return {
        isAdmin: MintCapData.data.length ?? 0 > 0,
        mintCapId: MintCapData.data[0]?.data?.objectId,
      };
    },
  });
}
