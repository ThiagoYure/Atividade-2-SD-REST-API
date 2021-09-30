import styles from '../styles/Recomendation.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Recomendation() {
    const [result, setResult] = useState([]);
    let param;
    let idArtista;
    useEffect(() => {
        param = window.location.href.split('?');
        idArtista = param[1].split('=');
        axios({
            url: `http://localhost:8000/recomendacao/${idArtista[1]}`,
            method: 'GET',
        }).then(tracks => {
            if (tracks) {
                console.log(tracks.data);
                setResult(tracks.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Spotify Artists Recomendation APP</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Recomendações fresquinhas para você!
                </h1>

                <div className={styles.form}>
                    <Link href={`/`}>
                        <a>Voltar</a>
                    </Link>
                </div>
                <div className={styles.result}>
                    <div className={styles.lista}>
                        {result.map(track => (
                            <div key={track.id} className={styles.card}>
                                <div className={styles.imagem}>
                                    {track.album.images.length > 0 ? <Image
                                        src={`` + track.album.images[0].url}
                                        alt="Picture of the artist"
                                        width={100}
                                        height={100}
                                        blurDataURL="data:..."
                                        placeholder="blur"
                                    /> :
                                        <Image
                                            src={`https://thumbs.dreamstime.com/b/musician-icon-189244196.jpg`}
                                            alt="Picture of the artist"
                                            width={100}
                                            height={100}
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                    }
                                </div>
                                <div className={styles.info}>
                                    <div><b>Nome da música:</b> {track.name}</div>
                                    <div><b>Álbum:</b> {track.album.name}</div>
                                    <div><b>Artistas envolvidos:</b>
                                        {track.album.artists.map(artista => (
                                            <p key={artista.name}>{artista.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}