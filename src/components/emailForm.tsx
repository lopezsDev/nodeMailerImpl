// components/EmailForm.tsx

"use client";  // Esta línea indica que el componente es un Client Component

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    email: string;
    subject: string;
    message: string;
}

const EmailForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                setSuccess(true);
                setFormData({ email: '', subject: '', message: '' });
            } else {
                setError(result.error || 'Error enviando el correo');
            }
        } catch (err) {
            setError('Error enviando el correo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Enviar Correo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email del destinatario"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>

            {success && <p>Correo enviado exitosamente!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default EmailForm;
