"use client"
import Head from "next/head"
import DragAndDrop from "./DragAndDrop"

const styles = {
  main: {
    padding: "1vw",
    fontFamily: "Arial, sans-serif",
  },
  h1: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  p: {
    marginBottom: "2rem",
  },
  container: {
    borderRadius: "5px",
    backgroundColor: "#2e6171",
    margin: "0vh 20vw 10vh 20vw",
  },
  mainContainer: {
    borderRadius: "5px",
    backgroundColor: "#2e6171",
    margin: "5vh 20vw 5vh 20vw",
  },
}

const Designer: React.FC = () => {
  return (
    <>
      <div style={styles.mainContainer}>
        <Head>
          <title>Quilt Pattern Calculator</title>
          <meta name="description" content="A log cabin quilt pattern calculator" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main className="main" style={styles.main}>
          <h1 style={styles.h1}>Welcome to the Quilt Pattern Calculator</h1>
          <p style={styles.p}>
            This tool allows you to easily calculate fabric needs and visualize a Log Cabin quilting pattern. Enter your
            preferences, and the calculator will provide you with both a diagram and detailed fabric requirements.
          </p>
        </main>
      </div>

      <div>
        <DragAndDrop />
      </div>
    </>
  )
}

export default Designer
