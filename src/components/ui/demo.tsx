import { GlowCard } from "@/src/components/ui/spotlight-card";

export function Default(){
  return(
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 custom-cursor bg-black">
      <GlowCard>
        <div className="text-white">Card 1</div>
      </GlowCard>
      <GlowCard>
        <div className="text-white">Card 2</div>
      </GlowCard>
      <GlowCard>
        <div className="text-white">Card 3</div>
      </GlowCard>
    </div>
  );
};
