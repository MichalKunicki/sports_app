import { GetServerSideProps, NextPage } from "next";
import { Matches } from "../types";

const today = new Date().toISOString().slice(0, 10);
const [yyyy, mm, dd] = today.split("-");
const plusOneWeek = `${yyyy}-${mm}-${Number(dd) + 7}`;

const groupBy = (array: Matches[], key: string) => {
  // Return the end result
  return array.reduce((result, currentValue: any) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

const Fixtures = ({
  matchesGroupedArray,
}: {
  matchesGroupedArray: Matches[];
}) => {
  return (
    <div>
      {matchesGroupedArray.map((match: Matches) => (
        <div
          key={match.id}
        >{`${match.homeTeam.name} : ${match.awayTeam.name}`}</div>
      ))}
      <pre>{JSON.stringify(matchesGroupedArray, undefined, 2)}</pre>;
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${plusOneWeek}
    `,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "4e9e470375b640a38e6c3081069133c2",
      },
    }
  );
  const { matches }: { matches: Matches[] } = await response.json();
  const matchesGrouped = groupBy(matches, "competition");
  const matchesGroupedArray = Object.values(matchesGrouped)[0];
  return {
    props: {
      matches,
      matchesGroupedArray,
    },
  };
};

export default Fixtures;
