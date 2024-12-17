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
        message: 'Type something to search on Wikipedia. (e.g., Brazil)',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
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
