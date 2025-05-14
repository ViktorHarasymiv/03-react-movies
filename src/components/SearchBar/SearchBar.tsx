import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";
import ErrorToast from "../Toast/ErrorToast";

interface SearchFormProps {
  onSubmit: (search: string) => void;
  isError: boolean;
}

function SearchBar({ onSubmit, isError }: SearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const search = formData.get("query") as string;
    if (search === "") {
      toast.error("This didn't work.");
      return;
    }
    onSubmit(search);
  };

  return (
    <header className={styles.header}>
      {!isError && <ErrorToast />}
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
