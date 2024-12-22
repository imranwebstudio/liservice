const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div>
            <div className={`max-w-screen-xl mx-auto ${className === undefined ? "" : className}`}>{children}</div>
        </div>
    );
};

export default Container;
