// src/components/ServicesPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    headerTitle: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: 'white',
    },
    dividerContainer: {
      position: 'relative',
      height: '4px',
      backgroundColor: 'transparent',
      width: '200px',
      margin: '0 auto',
    },
    dividerLine: {
      position: 'absolute',
      height: '4px',
      width: '100px',
      backgroundColor: '#1e90ff',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '2px',
    },
    dividerDot: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: '#1e90ff',
      borderRadius: '50%',
      top: '-4px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    serviceCard: {
      backgroundColor: 'white',
      color: '#051d33',
      borderRadius: '5px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    serviceCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    serviceImage: {
      height: '200px',
      overflow: 'hidden',
    },
    serviceImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    serviceContent: {
      padding: '20px',
    },
    serviceTitle: {
      color: '#051d33',
      marginBottom: '10px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    serviceDescription: {
      color: '#333',
      fontSize: '0.9rem',
      lineHeight: '1.5',
    },
    loading: {
      textAlign: 'center',
      padding: '50px',
      fontSize: '1.2rem',
      color: 'white',
    },
    error: {
      textAlign: 'center',
      padding: '50px',
      fontSize: '1.2rem',
      color: '#ff6b6b',
    },
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/v1/services');
        setServices(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dịch vụ. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Event handlers for hover states
  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    });
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: 'translateY(0)',
      boxShadow: 'none',
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Dịch vụ của chúng tôi</h1>
          <div style={styles.dividerContainer}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerDot}></div>
          </div>
        </div>
        <div style={styles.loading}>Đang tải dịch vụ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Dịch vụ của chúng tôi</h1>
          <div style={styles.dividerContainer}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerDot}></div>
          </div>
        </div>
        <div style={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Dịch vụ của chúng tôi</h1>
        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerDot}></div>
        </div>
      </div>
      
      <div style={styles.servicesGrid}>
        {services.map((service, index) => (
          <div 
            key={index} 
            style={styles.serviceCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.serviceImage}>
              <img 
                src={service.image} 
                alt={service.title} 
                style={styles.serviceImg} 
              />
            </div>
            <div style={styles.serviceContent}>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;