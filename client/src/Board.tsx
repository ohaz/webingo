import * as _React from "react";
import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { texts } from "./texts.ts";

type BoardEntry = {
  text: string;
  active: boolean;
  canBeEdited: boolean;
};

const solutions = [
    [true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],

    [true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false],
    [false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false],
    [false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false],
    [false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false],
    [false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true],

    [
        true, false, false, false, false,
        false, true, false, false, false,
        false, false, true, false, false,
        false, false, false, true, false,
        false, false, false, false, true,
    ],
    [
        false, false, false, false, true,
        false, false, false, true, false,
        false, false, true, false, false,
        false, true, false, false, false,
        true, false, false, false, false,
    ],
]

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function Board() {
  const boardFromStorage = loadBoard();
  const startingBoard = Object.keys(boardFromStorage).length === 0
    ? createBoard()
    : boardFromStorage;
  const [board, setBoard] = useState<BoardEntry[]>(startingBoard);

  function createBoard() {
    const entries: BoardEntry[] = texts.map((text) => {
      return { text: text, active: false, canBeEdited: true };
    });
    shuffle(entries);
    return [...entries.slice(0, 12), {
      text: "FREE",
      active: true,
      canBeEdited: false,
    }, ...entries.slice(12, 24)];
  }

  useEffect(() => {
    saveBoard();
  }, [board]);

  function toggle(index: number) {
    if (!board[index].canBeEdited) {
      return;
    }
    const newBoardEntry = {
      ...board[index],
      active: !board[index].active,
    };
    setBoard((
      previous: BoardEntry[],
    ) => [
      ...previous.slice(0, index),
      newBoardEntry,
      ...previous.slice(index + 1),
    ]);
  }

  function saveBoard() {
    localStorage.setItem("bingo", JSON.stringify(board));
  }

  function loadBoard() {
    return JSON.parse(localStorage.getItem("bingo") || "{}");
  }

  function restart() {
    setBoard(createBoard());
  }

  function hasWon() {
    const equalsCheck = (a: boolean[], b: boolean[]) => a.length === b.length && a.every((v, i) => v === b[i]);

    return solutions.some((solution) => {
        const and = solution.map((value, i) => value && board[i].active);
        return equalsCheck(and, solution);
    })
  }

  return (
    <Box>
      <Stack>
        {hasWon() ? (<h2>VICTORY!</h2>) : ''}
          <Grid container spacing={3} columns={5}>
            {board.map((element: BoardEntry, index: number) => (
              <Grid item key={index} xs={1}>
                <BoardElement
                  toggle={() =>
                    toggle(index)}
                  key={"be-" + index}
                  data={element}
                />
              </Grid>
            ))}
          </Grid>
        <p>Entries marked with *Text* are actions and approximate.</p>
        <Button sx={{ marginTop: "100px" }} onClick={restart}>Restart</Button>
      </Stack>
    </Box>
  );
}

type BoardElementProps = {
  data: BoardEntry;
  toggle: () => void;
};

export function BoardElement({ data, toggle }: BoardElementProps) {
  const backgroundColor = data.active ? "#e67e22" : "#95a5a6";
  return (
    <Paper
      sx={(_) => ({ height: 110, backgroundColor: backgroundColor })}
      component={Stack}
      direction="column"
      justifyContent="center"
      onClick={toggle}
    >
      {data.text}
    </Paper>
  );
}
