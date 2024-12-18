import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';

interface DBPediaProps {
  steps: {
    search: {
      value: string;
    };
  };
  triggerNextStep: () => void;
}

interface DBPediaState {
  loading: boolean;
  result: string;
  trigger: boolean;
}

class DBPedia extends Component<DBPediaProps, DBPediaState> {
  constructor(props: DBPediaProps) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  componentDidMount() {
    const { steps } = this.props;
    const search = steps.search.value.trim(); 

    if (!search) {
      this.setState({
        loading: false,
        result: 'Please provide a valid search term.',
      });
      return;
    }

    const endpoint = 'https://dbpedia.org';
    const query = `
      SELECT ?comment WHERE {
        ?x rdfs:label "${search}"@en .
        ?x rdfs:comment ?comment .
        FILTER (lang(?comment) = 'en')
      } LIMIT 1
    `;

    const queryUrl = `${endpoint}/sparql/?query=${encodeURIComponent(query)}&format=json`;

    fetch(queryUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const bindings = data.results.bindings;

        if (bindings && bindings.length > 0) {
          this.setState({
            loading: false,
            result: bindings[0].comment.value,
          });
        } else {
          this.setState({
            loading: false,
            result: 'No information found for your search term.',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data from DBpedia:', error);
        this.setState({
          loading: false,
          result: 'An error occurred while fetching data. Please try again later.',
        });
      });
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, result, trigger } = this.state;

    return (
      <div className="dbpedia">
        {loading ? (
          <Loading />
        ) : (
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{result}</p>
        )}
        {!loading && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            {!trigger && (
              <button
                onClick={this.triggerNext}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Search Again
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

const ExampleDBPedia = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Type something to search ',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: ({ value }) => {
          // Détecter les mots-clés liés aux voitures électriques
          const electricKeywords = ['electric', 'electric car', 'voitures electriques'];
          return electricKeywords.some(keyword => value.toLowerCase().includes(keyword)) ? 'electric-response' : '3';
        },
      },
      {
        id: 'electric-response',
        message: 'Les voitures électriques représentent une avancée majeure dans lindustrie automobile, offrant à la fois des performances remarquables et une solution écologique face aux défis environnementaux actuels. Parmi les modèles les plus réputés, Tesla et Mercedes se distinguent par leur innovation et leur qualité. Tesla, pionnier dans ce domaine, propose des véhicules comme la Model 3 et la Model S, qui allient autonomie exceptionnelle, vitesse impressionnante et technologies avancées, notamment leur système de conduite autonome. De son côté, Mercedes simpose avec sa gamme EQ, combinant luxe, confort et une ingénierie sophistiquée. Ces marques illustrent parfaitement comment les voitures électriques peuvent répondre à des besoins variés, que ce soit pour les amateurs de sportivité, les professionnels cherchant une image haut de gamme ou les consommateurs soucieux de réduire leur empreinte carbone. En optant pour une Tesla ou une Mercedes électrique, on fait le choix d’un véhicule performant, innovant et respectueux de l’environnement.',
        trigger: '1',
      },
      {
        id: '3',
        component: <DBPedia steps={{ search: { value: '' } }} triggerNextStep={() => {}} />,
        waitAction: true,
        trigger: '1',
      },
    ]}
    style={{ fontFamily: 'Arial, sans-serif' }} // Option de style ajoutée
    botDelay={500} // Délais de message pour un bot plus réaliste
    userDelay={500}
  />
);


export default ExampleDBPedia;
