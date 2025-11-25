import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { People, FitnessCenter, Add } from '@mui/icons-material';
import { UserList } from './components/UserList';
import { CreateUserForm } from './components/CreateUserForm';
import { WorkoutList } from './components/WorkoutList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const tabs = [
    { label: 'Alunos', icon: <People />, component: <UserList /> },
    { label: 'Novo Aluno', icon: <Add />, component: <CreateUserForm /> },
    { label: 'Treinos', icon: <FitnessCenter />, component: <WorkoutList /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <FitnessCenter sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gym Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="gym tabs">
            {tabs.map((tab, index) => (
              <Tab 
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        <Box>
          {tabs[currentTab].component}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
