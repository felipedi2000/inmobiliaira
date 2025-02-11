import React from 'react'
import PropTypes from 'prop-types';
import { Card, CardMedia,CardContent} from '@mui/material';
import BotonNavegar from './BotonNavegar';

export default function CardComponent({route, title, imageUrl}) {

    return (
      <Card sx={{ minWidth: 275, margin: 2 , backgroundColor: '#30a381', border: 'solid 2px', borderRadius: '8px'}}>
        <CardMedia
          component="img"
          alt={title}
          height="100"
          image={imageUrl}
          sx={{
              height:250
          }}
        />
        <CardContent sx={{display: "flex", justifyContent: "center"}}>
          <BotonNavegar ruta={route} texto={title}/>
        </CardContent>
      </Card>
    );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};