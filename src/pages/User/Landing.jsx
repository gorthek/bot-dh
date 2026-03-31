import { Link } from 'react-router-dom';
import { Bot, Zap, Shield, Trophy, Music, ChevronRight, Star, Users, MessageSquare, ArrowRight } from 'lucide-react';
import Background from '../components/Background';
import SkyDecor from '../components/SkyDecor';
import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const features = [
  { icon: Shield, title: 'Modération Avancée', desc: 'Auto-mod, filtres de spam, sanctions automatiques et logs détaillés.', color: 'violet' },
  { icon: Trophy, title: 'Système de Niveaux', desc: 'XP, classements, récompenses de rôle et cartes de profil personnalisables.', color: 'blue' },
  { icon: Music, title: 'Musique HD', desc: 'Lecture depuis YouTube, Spotify & SoundCloud. Qualité audio sans compromis.', color: 'green' },
  { icon: Zap, title: 'Commandes Custom', desc: 'Créez vos propres commandes, réponses automatiques et workflows.', color: 'yellow' },
  { icon: MessageSquare, title: 'Messages Bienvenue', desc: 'Accueillez vos nouveaux membres avec style grâce à des embeds personnalisés.', color: 'pink' },
  { icon: Users, title: 'Gestion des Rôles', desc: 'Attribution automatique, menus de sélection de rôles et permissions avancées.', color: 'red' },
];

const stats = [
  { value: '50K+', label: 'Serveurs actifs' },
  { value: '2M+', label: 'Utilisateurs' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

function Card3D({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-15, 15]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-60, 60], [0, 100]);
  const glowY = useTransform(y, [-60, 60], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ scale: 1.04, z: 30 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {/* Dynamic glare */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(139,92,246,0.15) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    const ctrl = animate(0, num, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString() + suffix),
    });
    return () => ctrl.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

const colorMap = {
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-400',
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-inter">
      <Background />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
      >
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">NexusBot</span>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.a
            href="#features"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
          >Fonctionnalités</motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40">
              Connexion Discord
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative text-center px-6 pt-20 pb-32">
        <SkyDecor />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
              <Star className="w-4 h-4 fill-violet-400 text-violet-400" />
            </motion.span>
            Le bot Discord ultime pour votre serveur
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Transformez votre{' '}
            <motion.span
              className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              serveur Discord
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Modération, niveaux, musique, commandes personnalisées — tout ce dont vous avez besoin pour créer une communauté exceptionnelle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link to="/login" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 animate-pulse-glow">
                <Bot className="w-5 h-5" />
                Ajouter à Discord
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/login" className="flex items-center gap-2 px-8 py-4 bg-secondary/50 border border-border hover:bg-secondary text-foreground rounded-2xl font-semibold text-base transition-all backdrop-blur-sm">
                Voir le Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero bot card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="relative z-10 mt-20 max-w-2xl mx-auto animate-float"
        >
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl shadow-violet-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">N</div>
              <div>
                <p className="font-bold text-foreground">NexusBot</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-400 inline-block"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  En ligne
                </p>
              </div>
              <div className="ml-auto px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold">BOT</div>
            </div>
            <div className="space-y-2 text-left">
              {[
                <>? <span className="text-green-300 font-medium">Alex</span> vient de passer au niveau <span className="text-violet-300 font-bold">15</span> !</>,
                <>?? Lecture en cours : <span className="text-foreground font-medium">Daft Punk - Around the World</span></>,
                <>??? Auto-mod : <span className="text-red-300">1 message supprimé</span> (spam détecté)</>
              ].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                  className="bg-secondary/50 rounded-xl p-3"
                >
                  <p className="text-sm text-muted-foreground">{msg}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        className="relative z-10 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } }}
              whileHover={{ scale: 1.07, y: -4, borderColor: 'rgba(139,92,246,0.4)' }}
              className="text-center p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl transition-colors cursor-default"
            >
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                <AnimatedCounter value={s.value} />
              </p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Tout ce dont vous avez{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">besoin</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Des fonctionnalités puissantes pour gérer et animer votre communauté.</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ perspective: 1200 }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              const cls = colorMap[f.color];
              return (
                <motion.div key={i} variants={cardVariants} style={{ transformStyle: 'preserve-3d' }}>
                  <Card3D className="group relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-violet-500/30 transition-colors duration-300 hover:shadow-2xl hover:shadow-violet-500/15 overflow-hidden cursor-default h-full">
                    <div className={`w-12 h-12 rounded-xl ${cls} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`} style={{ transform: 'translateZ(20px)' }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2" style={{ transform: 'translateZ(15px)' }}>{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{f.desc}</p>
                  </Card3D>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="relative z-10 px-6 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="relative bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-3xl p-12 overflow-hidden"
            whileHover={{ boxShadow: '0 0 60px rgba(139,92,246,0.2)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated orb inside CTA */}
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.h2
              className="text-4xl font-black mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >Prêt à commencer ?</motion.h2>
            <motion.p
              className="text-muted-foreground mb-8 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >Rejoignez des milliers de serveurs qui font confiance à NexusBot.</motion.p>
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/login" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50">
                <Bot className="w-5 h-5" />
                Ajouter NexusBot gratuitement
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 px-6 py-8 border-t border-border text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>© 2024 NexusBot — Fait avec ?? pour la communauté Discord</p>
      </motion.footer>
    </div>
  );
}