import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "react-d3-graph";
import "../Styles/ProblemPage.css";
import data from "../data.json";

const graphConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgray",
    size: 4000,
    highlightStrokeColor: "blue",
    directed: true,
  },
  link: {
    highlightColor: "lightblue",
  },
  d3: {
    gravity: -400,
    linkLength: 200,
  },
  directed: true,
  width: 900,
  height: 700,
};

const GraphComponent = () => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [solvedNodes, setSolvedNodes] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, []);

  const handleClick = (nodeId) => {
    console.log(nodeId);
    const node = graphData.nodes.find((node) => {
      //   console.log(typeof node.id, typeof nodeId);
      //   console.log(node.id.toString() === nodeId);
      if (node.id.toString() === nodeId) {
        return true;
      }
      return false;
    });

    if (!node) {
      console.error(`Node with id ${nodeId} not found`);
      return;
    }

    // Ensure dependencies property is defined
    const dependencies = node.dependencies;
    console.log("dependencies", dependencies);
    console.log("solved", solvedNodes);

    // Check if all dependencies are solved
    const allDependenciesSolved = (solvedNodes, dependencies) => {
      // Create a Set from solvedNodes for efficient lookup
      const solvedNodesSet = new Set(solvedNodes);

      // Check if every dependency is present in the solvedNodesSet
      return dependencies.every((dependency) =>
        solvedNodesSet.has(dependency.toString())
      );
    };
    console.log(allDependenciesSolved(solvedNodes, dependencies));
    if (nodeId === 1 || allDependenciesSolved(solvedNodes, dependencies)) {
      setSolvedNodes((prevSolvedNodes) => [...prevSolvedNodes, nodeId]);
      console.log(solvedNodes);
      const url =
        node.url ||
        "https://www.hackerrank.com/challenges/counting-valleys/problem?isFullScreen=true";
      window.open(url, "_blank");
    } else {
      alert("Please solve previous problems first.");
    }
  };

  useEffect(() => {
    // Update colors of solved nodes
    setGraphData((prevGraphData) => {
      const newGraphData = { ...prevGraphData };
      solvedNodes.forEach((id) => {
        const node = newGraphData.nodes.find(
          (node) => node.id.toString() === id
        );
        if (node) node.color = "green";
      });
      return newGraphData;
    });
  }, [solvedNodes]);

  return (
    <div>
      <div className="button-container">
        <button
          onClick={() =>
            window.open("https://www.hackerrank.com/auth/login", "_blank")
          }
        >
          Start
        </button>
      </div>
      <div className="graph-container">
        <Graph
          id="graph-id" // id is mandatory
          data={graphData}
          config={graphConfig}
          onClickNode={handleClick}
        />
      </div>
      <div className="button-container">
        <button onClick={() => navigate("/end")}>End</button>
      </div>
    </div>
  );
};

export default GraphComponent;
