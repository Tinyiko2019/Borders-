import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xnjkzlrw');
  
  if (state.succeeded) {
    return <p style={{textAlign:'center', padding:'40px', fontSize:'18px', color:'#16a34a'}}>Thanks! We’ll be in touch soon ✅</p>;
  }
  return (
    <div style={{maxWidth:'600px', margin:'40px auto', padding:'20px'}}>
      <h2 style={{textAlign:'center', marginBottom:'20px'}}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
        <input type="text" name="name" placeholder="Your Name" required style={{padding:'12px', border:'1px solid #ccc', borderRadius:'6px', fontSize:'16px'}}/>
        <input type="email" name="email" placeholder="Your Email" required style={{padding:'12px', border:'1px solid #ccc', borderRadius:'6px', fontSize:'16px'}}/>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea name="message" placeholder="Your Message" rows="4" required style={{padding:'12px', border:'1px solid #ccc', borderRadius:'6px', fontSize:'16px'}}/>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button type="submit" disabled={state.submitting} style={{background:'#2563eb', color:'#fff', padding:'12px 20px', border:0, borderRadius:'6px', cursor:'pointer', fontSize:'16px', fontWeight:600}}>
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
