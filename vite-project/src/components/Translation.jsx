function Translation({ translation }) {
  return (
    <div className='note-container'>
      <p className='note-title'>{translation.content}</p>
    </div>
  );
}

export default Translation;
