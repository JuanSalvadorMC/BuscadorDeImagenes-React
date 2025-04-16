import { Field, Form, Formik } from "formik";
import "./App.css";
import './components/header/header.css';
import { useState } from "react";
import NoResultsMessage from './components/NoResultsMessage/NoResultsMessage';
import AlertMessage from './components/AlertMessage/AlertMessage';

// Definición del tipo para las fotos
interface Photo {
  id: string;
  links: {
    html: string;
  };
  urls: {
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [apiUrl, setApiUrl] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const open = (url: string) => window.open(url, '_blank');
  console.log(photos);

  return (
    <div>
      
      <header>
        <h5>Buscador de Imágenes </h5>
        <p>Para comenzar una busqueda presiona enter</p>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            if (!values.search.trim()) {
              setAlertMessage("El campo de búsqueda está vacío. Por favor, ingresa un término.");
              return; // Detener el proceso de búsqueda
            }
            setAlertMessage(""); // Limpiar el mensaje de alerta si hay un valor
            setHasSearched(true);
            const url = `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`;
            setApiUrl(url);
            const response = await fetch(url, {
              headers: {
                'Authorization': 'Client-ID yyRFjMpC72RvGLTEh_P7SDd7393-PTcpn0ghdrH2SYY',
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            setPhotos(data.results);
            console.log(data);
            console.log(values);
          }}
        >

          <Form>
            <div className="input-group">
              <Field name="search" className="form-control" placeholder="Buscar..." />
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </Form>
          

        </Formik>
        {alertMessage && <AlertMessage message={alertMessage} />}
        <div className="container-view-api">
          <p>Peticion:</p>
          <p>{apiUrl}</p>
        </div>
      </header>
      <div className="container" id="container">
        <div className="center">
          {hasSearched && photos.length === 0 ? (
            <NoResultsMessage />
          ) : (
            photos.map((photo) => (
              <article className="card" key={photo.id} onClick={() => open(photo.links.html)}>
                <img src={photo.urls.regular} alt={photo.alt_description} />
                <h3>{photo.user.name}</h3>
                <p>{[photo.alt_description, photo.description].join(' - ')}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
