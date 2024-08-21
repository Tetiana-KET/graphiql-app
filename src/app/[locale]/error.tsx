'use client';

interface ErrorErrorProps {
  error: Error;
}

export default function ErrorError({ error }: ErrorErrorProps) {
  return <h1>{error.message}</h1>;
}
