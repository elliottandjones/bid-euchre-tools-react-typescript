import React from "react";
import { formatDateTime, UUID } from "./utils";

export interface Props {
  children: React.ReactNode;
}
export interface Game {
  id: string;
  dateTime: Date | string;
  players: Array<Player>;
  winner: Player | null;
  // numPlayers: number;
}
export interface Player {
  id: string;
  nickname: string;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  bidsTaken?: number;
  callCount?: number;
  upRiverCount?: number;
  luckySuit?: Suit;
}
export interface Suit {
  name?: string;
  symbol?: string;
}

const defaultPlayers: Array<Player> = [
  {
    id: "player_1",
    nickname: "Pat",
  },
  {
    id: "player_2",
    nickname: "Elliott",
  },
  {
    id: "player_3",
    nickname: "Liz",
  },
];
const defaultGames: Array<Game> = [
  {
    id: UUID(),
    dateTime: formatDateTime(),
    players: defaultPlayers,
    winner: null,
  },
];
// const defaultobj = {};
interface ContextProps {
  players: Player[];
  setPlayers: (v: any) => void;
  oldGames: Game[];
  setOldGames: (v: any) => void;
  savedGames: Game[] | any[];
  setSavedGames: (v: any) => void; //| React.Dispatch<React.SetStateAction<any[]>>;
}
//   interface ContextProps {
//     data: DataProps;
//     setData: (v: any) => void;
//   }
//   interface DataProps {
//   players: Player[];
//   savedGames?: Game[];
//   oldGames?: Game[];
// }

export const CTX = React.createContext<ContextProps>(undefined!);

const ContextStore: React.FC<Props> = (props) => {
  const [players, setPlayers] = React.useState(defaultPlayers);
  const [savedGames, setSavedGames] = React.useState(defaultGames);
  const [oldGames, setOldGames] = React.useState(defaultGames);

  React.useEffect(() => {
    const pData = localStorage.getItem("players");
    const sgData = localStorage.getItem("saved-games");
    const ogData = localStorage.getItem("old-games");
    try {
      if (pData) setPlayers(JSON.parse(pData));
      if (sgData) setSavedGames(JSON.parse(sgData));
      if (ogData) setOldGames(JSON.parse(ogData));
    } catch (error) {
      console.log(error);
    }
    // console.table(players);
    // console.table(savedGames);
    // console.table(oldGames);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("saved-games", JSON.stringify(savedGames));
    localStorage.setItem("old-games", JSON.stringify(oldGames));
    // mic check, localStorage, mic check
    // let p = localStorage.getItem("players");
    // let g = localStorage.getItem("saved-games");
    // if (p) console.table(JSON.parse(p));
    // if (g) console.table(JSON.parse(g));
  });

  return (
    <CTX.Provider
      value={{
        players,
        setPlayers,
        oldGames,
        setOldGames,
        savedGames,
        setSavedGames,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
};
export default ContextStore;
